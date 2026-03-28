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

interface defaultRegionStateInterface {
    [region: string]: {
        locations: typeof defaultLocationsState;
        units: typeof defaultUnitsState;
        influence: number;
        isDisableCities: boolean;
    }
}

const defaultRegionsState: defaultRegionStateInterface = Object.values(regions).reduce((acc, value) => ({
        ...acc,
        [value]: {
            locations: {...defaultLocationsState},
            units: { ...defaultUnitsState },
            influence: 0,
            isDisableCities: false,
        }
}), {})

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
    setIsDisableCities: (region: string, isDisableCities: boolean) => void;
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
                const isCity = [locations.CIUDADES.label, locations.CIUDADES_PORTUARIAS.label].includes(location);
                if (!newRegions[region].isDisableCities || !isCity) {
                    newRegions[region].influence += calculateInfluenceLocationInfluenceDiff(location, oldValue, value);
                }
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
                newRegions[region].influence += (diff);
                const newTotals = unit !== units.EXTRA.label ? calculateTotals(diff, unit, totals) : totals;
                return set({ regions: newRegions, totals: newTotals });
            },
            setIsDisableCities: (region: string, isDisableCities: boolean) => {
                const { regions } = get();
                const newRegions = { ...regions };
                const currentRegion = newRegions[region];
                currentRegion.isDisableCities = isDisableCities;
                const influenceDiff = Object.keys(currentRegion.locations).reduce(
                    (acc, location) => {
                        if ([locations.CIUDADES.label, locations.CIUDADES_PORTUARIAS.label].includes(location)) {
                            return acc + calculateInfluenceLocationInfluenceDiff(location, 0, currentRegion.locations[location]);
                        }
                        return acc;
                    },
                    0
                );
                if (isDisableCities) {
                    currentRegion.influence = currentRegion.influence - influenceDiff;
                } else {
                    currentRegion.influence = currentRegion.influence + influenceDiff;
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
