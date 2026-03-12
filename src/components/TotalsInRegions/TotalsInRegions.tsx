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
            <p>Ciudades: {totals[locations.CIUDADES.label]} / {locations.CIUDADES.max}</p>
            <p>Ciudades Portuarias: {totals[locations.CIUDADES_PORTUARIAS.label]} / {locations.CIUDADES_PORTUARIAS.max}</p>
            <p>Pueblos Agricolas: {totals[locations.PUEBLOS_AGRICOLAS.label]} / {locations.PUEBLOS_AGRICOLAS.max}</p>
            <p>Pueblos Industriales: {totals[locations.PUEBLOS_INDUSTRIALES.label]} / {locations.PUEBLOS_INDUSTRIALES.max}</p>
            <p>Infanteria: {totals[units.INFANTERIA.label]} / {units.INFANTERIA.max}</p>
            <p>Caballeria: {totals[units.CABALLERIA.label]} / {units.CABALLERIA.max}</p>
            <p>Asedio: {totals[units.ASEDIO.label]} / {units.ASEDIO.max}</p>
            <p>Maravillas: {totals[locations.MARAVILLAS.label]} / {locations.MARAVILLAS.max}</p>
        </div>
    )
}

export default TotalsInRegions;