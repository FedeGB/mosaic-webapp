import { useState } from 'react';
import InfluenceView from '../../views/InfluenceView/InfluenceView';
import { useRegionsStore, isStoreLoaded } from '../../store/regionsStore';
import { regions as regionTypes } from '../../types/regions';
import type { SelectChangeEvent } from '@mui/material/Select';

const Influence = () => {
    const regions = useRegionsStore((state) => state.regions);
    const setLocationNumber = useRegionsStore((state) => state.setLocationNumber);
    const setsetIsDisableUnits = useRegionsStore((state) => state.setIsDisableUnits);
    const setUnitNumber = useRegionsStore((state) => state.setUnitNumber);
    const totals = useRegionsStore((state) => state.totals);
    const [regionSelected, setRegionSelected] = useState(regionTypes.HIPSANIA);

    const handleOnRegionChange = (event: SelectChangeEvent) => {
        setRegionSelected(event.target.value);
    }

    const handleOnDisableUnitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsetIsDisableUnits(regionSelected, event.target.checked);
    }

    if (!isStoreLoaded) return null;

    return (
        <InfluenceView
            selectedRegion={regionSelected}
            handleOnRegionChange={handleOnRegionChange}
            regions={regions}
            setLocationNumber={setLocationNumber}
            setUnitNumber={setUnitNumber}
            totals={totals}
            isDisableUnits={regions[regionSelected].isDisableUnits}
            handleOnDisableUnitsChange={handleOnDisableUnitsChange}
        />
    )
}

export default Influence;