import RegionInfluence from '../../components/RegionInfluence/RegionInfluence';
import { defaultRegionsState } from '../../store/regionsStore';

import styles from './InfluenceView.module.scss';

interface InfluenceViewProps {
    regions: typeof defaultRegionsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
}

const InfluenceView = ({regions, setLocationNumber, setUnitNumber}: InfluenceViewProps) => {
  return (
    <div className={styles.wrapper}>
        {Object.entries(regions).map(([region, data]) => (
            <RegionInfluence
                key={region}
                region={region}
                locations={data.locations}
                units={data.units}
                setLocationNumber={setLocationNumber}
                setUnitNumber={setUnitNumber}
            />
        ))}
    </div>
  );
}

export default InfluenceView;