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
        locations: {...defaultLocationsState},
        units: { ...defaultUnitsState },
        influence: 0,
        isDisableUnits: false,
    },
    [regions.GALIA]: {
        locations: {...defaultLocationsState},
        units: {...defaultUnitsState},
        influence: 0,
        isDisableUnits: false,
    },
    [regions.ITALIA]: {
        locations: {...defaultLocationsState},
        units: {...defaultUnitsState},
        influence: 0,
        isDisableUnits: false,
    },
    [regions.GRECIA]: {
        locations: {...defaultLocationsState},
        units: {...defaultUnitsState},
        influence: 0,
        isDisableUnits: false,
    },
    [regions.ASIRIA]: {
        locations: {...defaultLocationsState},
        units: {...defaultUnitsState},
        isDisableUnits: false,
        influence: 0,
    },
    [regions.EGIPTO]: {
        locations: {...defaultLocationsState},
        units: {...defaultUnitsState},
        influence: 0,
        isDisableUnits: false,
    },
    [regions.NUMIDIA]: {
        locations: {...defaultLocationsState},
        units: {...defaultUnitsState},
        influence: 0,
        isDisableUnits: false,
    },
};

const defaultTotalsState = {
    [locations.CIUDADES.label]: 0,
    [locations.CIUDADES_PORTUARIAS.label]: 0,
    [locations.PUEBLOS_AGRICOLAS.label]: 0,
    [locations.PUEBLOS_INDUSTRIALES.label]: 0,
    [locations.MARAVILLAS.label]: 0,
    [units.INFANTERIA.label]: 0,
    [units.CABALLERIA.label]: 0,
    [units.ASEDIO.label]: 0,
}

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
    totals: typeof defaultTotalsState;
    setLocationNumber: (region: string, location: string, value: number) => void;
    setUnitNumber: (region: string, unit: string, value: number) => void;
    setIsDisableUnits: (region: string, isDisableUnit: boolean) => void;
    resetRegions: () => void;
};

const calculateTotals = (diff: number, label: string, totals: typeof defaultTotalsState) => {
    return { ...totals, [label]: totals[label] + diff };
}

const useRegionsStore = create<regionsStore>()(
    persist(
        (set, get) => ({
            regions: defaultRegionsState,
            totals: defaultTotalsState,
            setLocationNumber: (region: string, location: string, value: number) => { 
                const { regions, totals } = get();
                const newRegions = { ...regions };
                const oldValue = newRegions[region].locations[location];
                newRegions[region].influence += calculateInfluenceLocationInfluenceDiff(location, oldValue, value);
                newRegions[region].locations[location] = value;
                const newTotals = calculateTotals(value - oldValue, location, totals);
                return set({ regions: newRegions, totals: newTotals });
            },
            setUnitNumber: (region: string, unit: string, value: number) => {
                const { regions, totals } = get();
                const newRegions = { ...regions };
                const oldValue = newRegions[region].units[unit];
                const diff = value - oldValue;
                newRegions[region].units[unit] = value;
                if (!newRegions[region].isDisableUnits) {
                    newRegions[region].influence += (diff);
                }
                const newTotals = unit !== units.EXTRA.label ? calculateTotals(diff, unit, totals) : totals;
                return set({ regions: newRegions, totals: newTotals });
            },
            setIsDisableUnits: (region: string, isDisableUnit: boolean) => {
                const { regions } = get();
                const newRegions = { ...regions };
                const currentRegion = newRegions[region];
                currentRegion.isDisableUnits = isDisableUnit;
                if (isDisableUnit) {
                    currentRegion.influence = currentRegion.influence - Object.values(currentRegion.units).reduce((acc, value) => acc + value, 0);
                } else {
                    currentRegion.influence = currentRegion.influence + Object.values(currentRegion.units).reduce((acc, value) => acc + value, 0);
                }
                return set({ regions: newRegions });

            },
            resetRegions: () => set({ regions: defaultRegionsState, totals: defaultTotalsState }),
        }),
        {
            name: 'regions-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

const isStoreLoaded = useRegionsStore.persist.hasHydrated();

export { useRegionsStore, isStoreLoaded, defaultRegionsState, defaultTotalsState };
