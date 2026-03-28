import NumberSpinner from '../../components/NumberSpinner/NumberSpinner';
import type { defaultTotalsState } from '../../store/regionsStore';
import { locations as locationTypes } from '../../types/locations';
import { units as unitTypes } from '../../types/units';
import type { SelectChangeEvent } from '@mui/material/Select';
import RegionSelect from '../../components/RegionSelect/RegionSelect';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import styles from './RegionInfluence.module.scss';

interface RegionInfluenceProps {
    region: string;
    locations: Record<string, number>;
    units: Record<string, number>;
    influence: number;
    totals: typeof defaultTotalsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
    selectedRegion: string;
    handleOnRegionChange: (event: SelectChangeEvent) => void;
    isDisableCities: boolean;
    handleOnDisableCitiesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegionInfluence = ({
    region,
    locations,
    units,
    influence,
    totals,
    setLocationNumber,
    setUnitNumber,
    selectedRegion,
    handleOnRegionChange,
    isDisableCities,
    handleOnDisableCitiesChange
}: RegionInfluenceProps) => {
    const onLocationNumberChange = (location: string, value: number) => {
        setLocationNumber(region, location, value);
    }
    const onUnitNumberChange = (unit: string, value: number) => {
        setUnitNumber(region, unit, value);
    }

    const buildLocationsCounter = () => {
        return Object.keys(locationTypes).map((location) => {
            const label = locationTypes[location as keyof typeof locationTypes].label;
            const labelElement = <span className={styles['region-locations-counter-label']}>{label}</span>;
            const max = locationTypes[location as keyof typeof locationTypes].max + locations[label] - totals[label];
            return (
                <div key={location} className={styles['region-locations-counter']}>
                    <NumberSpinner
                        defaultValue={0}
                        value={locations[label] ?? 0}
                        onValueChange={(value) => onLocationNumberChange(label, value || 0)}
                        key={location}
                        label={labelElement}
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
            const labelElement = <span className={styles['region-units-counter-label']}>{label}</span>;
            const max = label !== unitTypes.EXTRA.label ?
                unitTypes[unit as keyof typeof unitTypes].max + units[label] - totals[label] :
                unitTypes[unit as keyof typeof unitTypes].max;
            return (
                <div key={unit} className={styles['region-units-counter']}>
                    <NumberSpinner
                        defaultValue={0}
                        value={units[label] ?? 0}
                        onValueChange={(value) => onUnitNumberChange(label, value || 0)}
                        key={unit}
                        label={labelElement}
                        min={0}
                        max={max}
                    />
                </div>
            )
        })
    }

    return (
        <div className={styles.region}>
            <h2 className={styles['region-title']}>
                <RegionSelect handleOnChange={handleOnRegionChange} value={selectedRegion} />
                <span className={styles['region-title-influence']}>Influencia: {influence}</span>
            </h2>
            <div className={styles['region-locations']}>
                {buildLocationsCounter()}
            </div>
            <div className={styles['region-units']}>
                {buildUnitsCounter()}
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isDisableCities}
                        onChange={handleOnDisableCitiesChange}
                        size='large'
                        sx={{
                            color: 'black',
                            '&.Mui-checked': {
                                color: 'black',
                            },
                        }}
                    />
                }
                label="Deshabilitar ciudades"
                sx={{
                    '& .MuiFormControlLabel-label': {
                        fontSize: 18,
                        fontWeight: '500',
                    }
                }}
            />
        </div>
    )
}

export default RegionInfluence;