import InfluenceView from '../../views/InfluenceView/InfluenceView';
import { useRegionsStore } from '../../store/regionsStore';

const Influence = () => {
    const regions = useRegionsStore((state) => state.regions);
    const setLocationNumber = useRegionsStore((state) => state.setLocationNumber);
    const setUnitNumber = useRegionsStore((state) => state.setUnitNumber);

    return (
        <InfluenceView regions={regions} setLocationNumber={setLocationNumber} setUnitNumber={setUnitNumber} />
    )
}

export default Influence;