import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { regions } from '../types/regions';
import { locations } from '../types/locations';
import { units } from '../types/units';

const defaultLocationsState = {
    [locations.CIUDADES.label]: 0,
    [locations.CIUDADES_PORTUARIAS.label]: 0,
    [locations.PUEBLOS_AGRICOLAS.label]: 0,
    [locations.PUEBLOS_INDUSTRIALES.label]: 0,
    [locations.MARAVILLAS.label]: 0,
}

const defaultUnitsState = {
    [units.INFANTERIA.label]: 0,
    [units.CABALLERIA.label]: 0,
    [units.ASEDIO.label]: 0,
    [units.EXTRA.label]: 0,
}

const defaultRegionsState = {
    [regions.HIPSANIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
        influence: 0,
    },
    [regions.GALIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
        influence: 0,
    },
    [regions.ITALIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
        influence: 0,
    },
    [regions.GRECIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
        influence: 0,
    },
    [regions.ASIRIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
        influence: 0,
    },
    [regions.EGIPTO]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
         influence: 0,
    },
    [regions.NUMIDIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
        influence: 0,
    },
};

const calculateInfluenceLocationInfluenceDiff = (location: string, oldValue: number, newValue: number) => {
    const influencePoints = [
        locations.CIUDADES.label,
        locations.CIUDADES_PORTUARIAS.label,
        locations.MARAVILLAS.label
    ].includes(location) ? 2 : 1;
    return (newValue - oldValue) * influencePoints;
}

type regionsStore = {
    regions: typeof defaultRegionsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
    resetRegions: () => void;
};

const useRegionsStore = create<regionsStore>()(
    persist(
        (set, get) => ({
            regions: defaultRegionsState,
            setLocationNumber: (region: string, location: string, value: number) => { 
                // if(value > locations[location as keyof typeof locations].max) {
                //     return;
                // }
                const newRegions = { ...get().regions };
                const oldValue = newRegions[region].locations[location];
                newRegions[region].influence += calculateInfluenceLocationInfluenceDiff(location, oldValue, value);
                newRegions[region].locations[location] = value;
                return set({ regions: newRegions });
            },
            setUnitNumber: (region: string, unit: string, value: number) => {
                // if(value > units[unit as keyof typeof units].max) {
                //     return;
                // }
                const newRegions = { ...get().regions };
                const oldValue = newRegions[region].units[unit];
                const diff = value - oldValue;
                newRegions[region].units[unit] = value;
                newRegions[region].influence += (diff);
                return set({ regions: newRegions });
            },
            resetRegions: () => set({ regions: defaultRegionsState }),
        }),
        {
            name: 'regions-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

const isStoreLoaded = useRegionsStore.persist.hasHydrated();

export { useRegionsStore, isStoreLoaded, defaultRegionsState };
