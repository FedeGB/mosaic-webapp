import styles from './TotalsInRegions.module.scss';

interface TotalsInRegionsProps {
    cities: number;
    towns: number;
    units: number;
    wonders: number;
}

const TotalsInRegions = ({cities, towns, units, wonders}: TotalsInRegionsProps) => {
    return (
        <div className={styles['wrapper']}>
            <p>Ciudades: {cities}</p>
            <p>Pueblos: {towns}</p>
            <p>Unidades: {units}</p>
            <p>Maravillas: {wonders}</p>
        </div>
    )
}

export default TotalsInRegions;