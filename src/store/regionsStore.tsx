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
}

const defaultRegionsState = {
    [regions.HIPSANIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
    },
    [regions.GALIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
    },
    [regions.ITALIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
    },
    [regions.GRECIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
    },
    [regions.ASIRIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
    },
    [regions.EGIPTO]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
    },
    [regions.NUMIDIA]: {
        locations: defaultLocationsState,
        units: defaultUnitsState,
    },
};

type regionsStore = {
    regions: typeof defaultRegionsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
};

const useRegionsStore = create<regionsStore>()(
    persist(
        (set, get) => ({
            regions: defaultRegionsState,
            setLocationNumber: (region: string, location: string, value: number) => {
                if(value > locations[location as keyof typeof locations].max) {
                    return;
                }
                const newRegions = { ...get().regions };
                newRegions[region].locations[location] = value;
                return set({ regions: newRegions });
            },
            setUnitNumber: (region: string, unit: string, value: number) => {
                if(value > units[unit as keyof typeof units].max) {
                    return;
                }
                const newRegions = { ...get().regions };
                newRegions[region].units[unit] = value;
                return set({ regions: newRegions });
            }
        }),
        {
            name: 'regions-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

const clearRegionsStore = () => {
    useRegionsStore.persist.clearStorage();
}

export { useRegionsStore, clearRegionsStore, defaultRegionsState };
