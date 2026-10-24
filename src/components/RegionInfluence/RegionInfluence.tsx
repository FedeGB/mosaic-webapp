import NumberSpinner from '../../components/NumberSpinner/NumberSpinner';
import type { defaultTotalsState } from '../../store/regionsStore';
import { locations as locationTypes } from '../../types/locations';
import { units as unitTypes } from '../../types/units';
import type { SelectChangeEvent } from '@mui/material/Select';
import RegionSelect from '../../components/RegionSelect/RegionSelect';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { regionColors } from '../../types/regions';

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
        <div className={styles.region} style={{ '--region-color': regionColors[region as keyof typeof regionColors] } as React.CSSProperties}>
            <div className={styles['region-title']}>
                <div>
                    <span className={styles.kicker}>Región seleccionada</span>
                    <RegionSelect handleOnChange={handleOnRegionChange} value={selectedRegion} />
                </div>
                <div className={styles['region-title-influence']}>
                    <span>Influencia</span>
                    <strong>{influence}</strong>
                </div>
            </div>
            <div className={styles.sectionHeading}>
                <h2>Construcciones</h2>
                <span>Desarrollo de la región</span>
            </div>
            <div className={styles['region-locations']}>
                {buildLocationsCounter()}
            </div>
            <div className={styles.sectionHeading}>
                <h2>Unidades</h2>
                <span>Presencia militar</span>
            </div>
            <div className={styles['region-units']}>
                {buildUnitsCounter()}
            </div>
            <div className={styles.cityToggle}>
                <FormControlLabel
                    control={<Checkbox checked={isDisableCities} onChange={handleOnDisableCitiesChange} color="primary" />}
                    label="No contar ciudades ni puertos"
                />
                <span>Útil cuando la regla de la región los excluye.</span>
            </div>
        </div>
    )
}

export default RegionInfluence;
