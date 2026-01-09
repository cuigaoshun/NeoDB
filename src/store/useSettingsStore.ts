import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Settings {
  // Redis settings
  redisScanCount: number;
}

interface SettingsState extends Settings {
  setRedisScanCount: (count: number) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  redisScanCount: 1000,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setRedisScanCount: (count) => set({ redisScanCount: count }),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'neodb-settings',
    }
  )
);
