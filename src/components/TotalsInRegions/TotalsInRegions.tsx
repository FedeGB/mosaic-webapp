import styles from './TotalsInRegions.module.scss';
import { defaultTotalsState } from '../../store/regionsStore';
import { locations } from '../../types/locations';
import { units } from '../../types/units';


interface TotalsInRegionsProps {
    totals: typeof defaultTotalsState;
}

const TotalsInRegions = ({totals}: TotalsInRegionsProps) => {
    const supplyIcons: Record<string, string> = {
        Ciudades: '⌂', 'Ciudades portuarias': '⚓', 'Pueblos agrícolas': '♧',
        'Pueblos industriales': '⚒', Maravillas: '✦', Infantería: '♟', Caballería: '♞', Asedio: '◉'
    };
    return (
        <div className={styles['wrapper']}>
            <div className={styles.heading}>
                <span>Reserva común</span>
                <small>Piezas en el tablero</small>
            </div>
            {Object.keys(locations).map((location) => {
                const label = locations[location as keyof typeof locations].label;
                const max = locations[location as keyof typeof locations].max;
                const used = totals[label];
                return (
                    <div className={styles['total']} key={location}>
                        <span className={styles.icon} aria-hidden="true">{supplyIcons[label]}</span>
                        <span className={styles.label}>{label}</span>
                        <strong>{used}<small> / {max}</small></strong>
                        <span className={styles.meter}><i style={{ width: `${Math.min((used / max) * 100, 100)}%` }} /></span>
                    </div>
                )
            })}
            {Object.keys(units).map((unit) => {
                if (unit === 'EXTRA') {
                    return null;
                }
                const label = units[unit as keyof typeof units].label;
                const max = units[unit as keyof typeof units].max;
                const used = totals[label];
                return (
                    <div className={styles['total']} key={unit}>
                        <span className={styles.icon} aria-hidden="true">{supplyIcons[label]}</span>
                        <span className={styles.label}>{label}</span>
                        <strong>{used}<small> / {max}</small></strong>
                        <span className={styles.meter}><i style={{ width: `${Math.min((used / max) * 100, 100)}%` }} /></span>
                    </div>
                )
            })}
        </div>
    )
}

export default TotalsInRegions;
