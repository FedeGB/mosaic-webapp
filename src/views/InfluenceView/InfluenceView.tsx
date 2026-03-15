import RegionInfluence from '../../components/RegionInfluence/RegionInfluence';
import { defaultRegionsState, defaultTotalsState } from '../../store/regionsStore';
import TotalsInRegions from '../../components/TotalsInRegions/TotalsInRegions';
import type { SelectChangeEvent } from '@mui/material/Select';

import styles from './InfluenceView.module.scss';
import RegionSelect from '../../components/RegionSelect/RegionSelect';

interface InfluenceViewProps {
    regions: typeof defaultRegionsState;
    totals: typeof defaultTotalsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
    selectedRegion: string;
    handleOnRegionChange: (event: SelectChangeEvent) => void;

}

const InfluenceView = ({selectedRegion, handleOnRegionChange, regions, totals, setLocationNumber, setUnitNumber}: InfluenceViewProps) => {
  return (
    <div className={styles.wrapper}>
        <TotalsInRegions totals={totals} />
        <RegionInfluence
            region={selectedRegion}
            locations={regions[selectedRegion].locations}
            units={regions[selectedRegion].units}
            influence={regions[selectedRegion].influence}
            setLocationNumber={setLocationNumber}
            setUnitNumber={setUnitNumber}
            totals={totals}
            selectedRegion={selectedRegion}
            handleOnRegionChange={handleOnRegionChange}
        />
    </div>
  );
}

export default InfluenceView;