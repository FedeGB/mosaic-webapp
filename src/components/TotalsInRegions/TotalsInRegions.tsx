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
            <span className={styles['total']}>Ciudades: {totals[locations.CIUDADES.label]} / {locations.CIUDADES.max}</span>
            <span className={styles['total']}>Ciudades Portuarias: {totals[locations.CIUDADES_PORTUARIAS.label]} / {locations.CIUDADES_PORTUARIAS.max}</span>
            <span className={styles['total']}>Pueblos Agricolas: {totals[locations.PUEBLOS_AGRICOLAS.label]} / {locations.PUEBLOS_AGRICOLAS.max}</span>
            <span className={styles['total']}>Pueblos Industriales: {totals[locations.PUEBLOS_INDUSTRIALES.label]} / {locations.PUEBLOS_INDUSTRIALES.max}</span>
            <span className={styles['total']}>Infanteria: {totals[units.INFANTERIA.label]} / {units.INFANTERIA.max}</span>
            <span className={styles['total']}>Caballeria: {totals[units.CABALLERIA.label]} / {units.CABALLERIA.max}</span>
            <span className={styles['total']}>Asedio: {totals[units.ASEDIO.label]} / {units.ASEDIO.max}</span>
            <span className={styles['total']}>Maravillas: {totals[locations.MARAVILLAS.label]} / {locations.MARAVILLAS.max}</span>
        </div>
    )
}

export default TotalsInRegions;