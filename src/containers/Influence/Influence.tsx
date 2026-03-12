import InfluenceView from '../../views/InfluenceView/InfluenceView';
import { useRegionsStore, isStoreLoaded } from '../../store/regionsStore';

const Influence = () => {
    const regions = useRegionsStore((state) => state.regions);
    const setLocationNumber = useRegionsStore((state) => state.setLocationNumber);
    const setUnitNumber = useRegionsStore((state) => state.setUnitNumber);
    const totals = useRegionsStore((state) => state.totals);

    if (!isStoreLoaded) return null;

    return (
        <InfluenceView regions={regions} setLocationNumber={setLocationNumber} setUnitNumber={setUnitNumber} totals={totals} />
    )
}

export default Influence;