import styles from './TotalsInRegions.module.scss';
import { defaultTotalsState } from '../../store/regionsStore';
import { locations } from '../../types/locations';
import { units } from '../../types/units';


interface TotalsInRegionsProps {
    totals: typeof defaultTotalsState;
}

const TotalsInRegions = ({totals}: TotalsInRegionsProps) => {
    return (
        <div className={styles['wrapper']}>
            {Object.keys(locations).map((location) => {
                const label = locations[location as keyof typeof locations].label;
                const max = locations[location as keyof typeof locations].max;
                return (
                    <span className={styles['total']}>{label}: {totals[label]} / {max}</span>
                )
            })}
            {Object.keys(units).map((unit) => {
                if (unit === 'EXTRA') {
                    return null;
                }
                const label = units[unit as keyof typeof units].label;
                const max = units[unit as keyof typeof units].max;
                return (
                    <span className={styles['total']}>{label}: {totals[label]} / {max}</span>
                )
            })}
        </div>
    )
}

export default TotalsInRegions;