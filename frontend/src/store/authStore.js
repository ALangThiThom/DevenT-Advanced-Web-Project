import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logout } from "../services/authService";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => {
        set({ user, token });
      },

      logout: async () => {
        try {
          await logout();
        } catch (error) {
          console.error("Error when logging out:", error);
        }
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
