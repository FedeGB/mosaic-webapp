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
            <label>Ciudades: {totals[locations.CIUDADES.label]} / {locations.CIUDADES.max}</label>
            <label>Ciudades Portuarias: {totals[locations.CIUDADES_PORTUARIAS.label]} / {locations.CIUDADES_PORTUARIAS.max}</label>
            <label>Pueblos Agricolas: {totals[locations.PUEBLOS_AGRICOLAS.label]} / {locations.PUEBLOS_AGRICOLAS.max}</label>
            <label>Pueblos Industriales: {totals[locations.PUEBLOS_INDUSTRIALES.label]} / {locations.PUEBLOS_INDUSTRIALES.max}</label>
            <label>Infanteria: {totals[units.INFANTERIA.label]} / {units.INFANTERIA.max}</label>
            <label>Caballeria: {totals[units.CABALLERIA.label]} / {units.CABALLERIA.max}</label>
            <label>Asedio: {totals[units.ASEDIO.label]} / {units.ASEDIO.max}</label>
            <label>Maravillas: {totals[locations.MARAVILLAS.label]} / {locations.MARAVILLAS.max}</label>
        </div>
    )
}

export default TotalsInRegions;