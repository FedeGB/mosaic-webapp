import RegionInfluence from '../../components/RegionInfluence/RegionInfluence';
import { defaultRegionsState, defaultTotalsState } from '../../store/regionsStore';
import TotalsInRegions from '../../components/TotalsInRegions/TotalsInRegions';

import styles from './InfluenceView.module.scss';

interface InfluenceViewProps {
    regions: typeof defaultRegionsState;
    totals: typeof defaultTotalsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
    selectedRegion: string;
    handleOnRegionChange: (region: string) => void;
    isDisableCities: boolean;
    handleOnDisableCitiesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InfluenceView = ({
  selectedRegion,
  handleOnRegionChange,
  regions,
  totals,
  setLocationNumber,
  setUnitNumber,
  isDisableCities,
  handleOnDisableCitiesChange
}: InfluenceViewProps) => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Tablero de influencia</span>
          <h1>Expande tu civilización</h1>
          <p>Registra construcciones y unidades por región. El suministro disponible se actualiza automáticamente.</p>
        </div>
        <div className={styles.board}>
          <aside className={styles.supplies}>
            <TotalsInRegions totals={totals} />
          </aside>
          <main className={styles.regionPanel}>
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
              isDisableCities={isDisableCities}
              handleOnDisableCitiesChange={handleOnDisableCitiesChange}
            />
          </main>
        </div>
    </div>
  );
}

export default InfluenceView;
