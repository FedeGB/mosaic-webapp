import NumberSpinner from '../../components/NumberSpinner/NumberSpinner';
import { locations } from '../../types/locations';
import { units } from '../../types/units';

const RegionInfluence = () => {

    const buildLocationsCounter = () => {
        return Object.keys(locations).map((location) => {
            const label = locations[location as keyof typeof locations].label;
            const max = locations[location as keyof typeof locations].max;
            return (
                // https://base-ui.com/react/components/number-field#api-reference
                <NumberSpinner value={5} onValueChange={(value) => console.log(value)} defaultValue={0} key={location} label={label} min={0} max={max} />
            )
        })
    }

    const buildUnitsCounter = () => {
        return Object.keys(units).map((unit) => {
            const label = units[unit as keyof typeof units].label;
            const max = units[unit as keyof typeof units].max;
            return (
                <NumberSpinner onValueChange={(value) => console.log(value)} defaultValue={0} key={unit} label={label} min={0} max={max} />
            )
        })
    }

    return (
        <div>
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