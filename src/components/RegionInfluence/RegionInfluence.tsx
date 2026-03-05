import NumberSpinner from '../../components/NumberSpinner/NumberSpinner';
import { locations as locationTypes } from '../../types/locations';
import { units as unitTypes } from '../../types/units';

interface RegionInfluenceProps {
    region: string;
    locations: Record<string, number>;
    units: Record<string, number>;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
}

const RegionInfluence = ({region, locations, units, setLocationNumber, setUnitNumber}: RegionInfluenceProps) => {
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
                <NumberSpinner
                    defaultValue={0}
                    value={locations[location]}
                    onValueChange={(value) => onLocationNumberChange(location, value || 0)}
                    key={location}
                    label={label}
                    min={0}
                    max={max}
                />
            )
        })
    }

    const buildUnitsCounter = () => {
        return Object.keys(unitTypes).map((unit) => {
            const label = unitTypes[unit as keyof typeof unitTypes].label;
            const max = unitTypes[unit as keyof typeof unitTypes].max;
            return (
                <NumberSpinner
                    defaultValue={0}
                    value={units[unit]}
                    onValueChange={(value) => onUnitNumberChange(unit, value || 0)}
                    key={unit}
                    label={label}
                    min={0}
                    max={max}
                />
            )
        })
    }

    return (
        <div>
            <h2>{region}</h2>
            <div className="locations-counters">
                {buildLocationsCounter()}
            </div>
            <div className="units-counters">
                {buildUnitsCounter()}
            </div>
        </div>
    )
}

export default RegionInfluence;