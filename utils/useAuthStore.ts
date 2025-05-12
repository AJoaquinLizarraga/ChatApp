
/** @format */
// src/utils/useAuthStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const MASTER_USERNAME = "admin";
const MASTER_PASSWORD = "secret123";

interface AuthState {
  user: { username: string } | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      signIn: async (username, password) => {
        set({ loading: true });

        await new Promise((r) => setTimeout(r, 500));
        if (username === MASTER_USERNAME && password === MASTER_PASSWORD) {
          set({ user: { username }, loading: false });
        } else {
          set({ loading: false });
          throw new Error("Usuario o contraseña incorrectos");
        }
      },

      signOut: () => set({ user: null }),
    }),
    {
      name: "@MyApp/auth",
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => (state) => {
        state?.signOut();
      },
    }
  )
);
