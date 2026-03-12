import RegionInfluence from '../../components/RegionInfluence/RegionInfluence';
import { defaultRegionsState, defaultTotalsState } from '../../store/regionsStore';
import TotalsInRegions from '../../components/TotalsInRegions/TotalsInRegions';

import styles from './InfluenceView.module.scss';

interface InfluenceViewProps {
    regions: typeof defaultRegionsState;
    totals: typeof defaultTotalsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
}

const InfluenceView = ({regions, totals, setLocationNumber, setUnitNumber}: InfluenceViewProps) => {
  return (
    <div className={styles.wrapper}>
        <TotalsInRegions totals={totals} />
        {Object.entries(regions).map(([region, data]) => (
            <RegionInfluence
                key={region}
                region={region}
                locations={data.locations}
                units={data.units}
                influence={data.influence}
                setLocationNumber={setLocationNumber}
                setUnitNumber={setUnitNumber}
            />
        ))}
    </div>
  );
}

export default InfluenceView;