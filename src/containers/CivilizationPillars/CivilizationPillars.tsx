import PillarsView from '../../views/PillarsView/PillarsView';
import { usePillarsStore, isPillarsStoreLoaded } from '../../store/pillarsStore';

const CivilizationPillars = () => {
    const { pillars, setPillarCount } = usePillarsStore();
    if (!isPillarsStoreLoaded) return null;
    return (
        <div>
            <PillarsView pillars={pillars} setPillarCount={setPillarCount} />
        </div>
    );
};

export default CivilizationPillars;