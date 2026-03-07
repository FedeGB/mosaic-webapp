import NumberSpinner from '../../components/NumberSpinner/NumberSpinner';
import { locations as locationTypes } from '../../types/locations';
import { units as unitTypes } from '../../types/units';

import styles from './RegionInfluence.module.scss';

interface RegionInfluenceProps {
    region: string;
    locations: Record<string, number>;
    units: Record<string, number>;
    influence: number;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
}

const RegionInfluence = ({region, locations, units, influence, setLocationNumber, setUnitNumber}: RegionInfluenceProps) => {
    const onLocationNumberChange = (location: string, value: number) => {
        setLocationNumber(region, location, value);
    }
    const onUnitNumberChange = (unit: string, value: number) => {
        setUnitNumber(region, unit, value);
    }

    const buildLocationsCounter = () => {
        return Object.keys(locationTypes).map((location) => {
            const label = locationTypes[location as keyof typeof locationTypes].label;
            const max = locationTypes[location as keyof typeof locationTypes].max;
            return (
                <div key={location} className={styles['region-locations-counter']}>
                    <NumberSpinner
                        defaultValue={0}
                        value={locations[label] ?? 0}
                        onValueChange={(value) => onLocationNumberChange(label, value || 0)}
                        key={location}
                        label={label}
                    min={0}
                    max={max}
                />
                </div>
            )
        })
    }

    const buildUnitsCounter = () => {
        return Object.keys(unitTypes).map((unit) => {
            const label = unitTypes[unit as keyof typeof unitTypes].label;
            const max = unitTypes[unit as keyof typeof unitTypes].max;
            return (
                <div key={unit} className={styles['region-units-counter']}>
                    <NumberSpinner
                        defaultValue={0}
                        value={units[label] ?? 0}
                        onValueChange={(value) => onUnitNumberChange(label, value || 0)}
                        key={unit}
                        label={label}
                        min={0}
                        max={max}
                    />
                </div>
            )
        })
    }

    return (
        <div className={styles.region}>
            <h2>{region}</h2>
            <p>Influencia: {influence}</p>
            <div className={styles['region-locations']}>
                {buildLocationsCounter()}
            </div>
            <div className={styles['region-units']}>
                {buildUnitsCounter()}
            </div>
        </div>
    )
}

export default RegionInfluence;