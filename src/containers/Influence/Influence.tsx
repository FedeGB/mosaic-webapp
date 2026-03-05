import InfluenceView from '../../views/InfluenceView/InfluenceView';
import { useRegionsStore } from '../../store/regionsStore';

const Influence = () => {
    const regions = useRegionsStore((state) => state.regions);
    const setLocationNumber = useRegionsStore((state) => state.setLocationNumber);
    const setUnitNumber = useRegionsStore((state) => state.setUnitNumber);

    return (
        <div>
            <InfluenceView regions={regions} setLocationNumber={setLocationNumber} setUnitNumber={setUnitNumber} />
        </div>
    )
}

export default Influence;