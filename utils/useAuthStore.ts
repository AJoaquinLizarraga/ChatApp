/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: { username: string } | null;
  loading: boolean;
  userName: string;
  setLoading: (loading: boolean) => void; // 👈agregamos setter
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  setUsername: (username: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      userName: "",
      setUsername: (username) => {
        set({ user: { username }, loading: false });
      },
      setLoading: (loading) => set({ loading }),
      signIn: async (username, password) => {
        // aquí tu lógica real de login...
        set({ user: { username }, loading: false });
      },
      signOut: () => set({ user: null }),
    }),
    {
      name: "@MyApp/auth",
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => (state) => {
        // esto se llama cuando termina de traer del storage
        state?.setLoading(false);
      },
    }
  )
);
