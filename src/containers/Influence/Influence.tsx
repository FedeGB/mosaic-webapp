import InfluenceView from '../../views/InfluenceView/InfluenceView';
import { useRegionsStore, isStoreLoaded } from '../../store/regionsStore';

const Influence = () => {
    const regions = useRegionsStore((state) => state.regions);
    const setLocationNumber = useRegionsStore((state) => state.setLocationNumber);
    const setUnitNumber = useRegionsStore((state) => state.setUnitNumber);

    if (!isStoreLoaded) return null;

    return (
        <InfluenceView regions={regions} setLocationNumber={setLocationNumber} setUnitNumber={setUnitNumber} />
    )
}

export default Influence;