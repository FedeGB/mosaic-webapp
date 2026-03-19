import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { civilizationPillars } from '../types/pillars';

const defaultPillarsState = Object.keys(civilizationPillars).reduce((acc, key) => ({
    ...acc,
    [key]: 0
}), {} as Record<string, number>);

type pillarsStore = {
    pillars: typeof defaultPillarsState;
    setPillarCount: (pillar: string, count: number) => void;
    resetPillars: () => void;
};

const usePillarsStore = create<pillarsStore>()(
    persist(
        (set, get) => ({
            pillars: defaultPillarsState,
            setPillarCount: (pillar: string, count: number) => {
                const { pillars } = get();
                const newPillars = { ...pillars, [pillar]: count };
                set({ pillars: newPillars });
            },
            resetPillars: () => set({ pillars: defaultPillarsState }),
        }),
        {
            name: 'pillars-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

const isPillarsStoreLoaded = usePillarsStore.persist.hasHydrated();

export { usePillarsStore, isPillarsStoreLoaded };