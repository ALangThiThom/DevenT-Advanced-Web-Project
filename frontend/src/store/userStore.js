import { create } from "zustand";
import { getUserProfile } from "../services/userService";

const useUserStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getUserProfile();
      set({ profile: data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Không thể tải thông tin profile",
        loading: false,
      });
    }
  },

  clearProfile: () => set({ profile: null, error: null }),
}));

export default useUserStore;