import { create } from "zustand";
import { getUserProfile, getRegisteredEvents, getFinishedEvents, getCancelledEvents } from "../services/userService";

const useUserStore = create((set) => ({
  profile: null,
  registeredEvents: [],
  finishedEvents: [],
  cancelledEvents: [],
  loading: false,
  eventsLoading: false,
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

  fetchRegisteredEvents: async () => {
    set({ eventsLoading: true });
    try {
      const data = await getRegisteredEvents();
      set({ registeredEvents: data, eventsLoading: false });
    } catch {
      set({ eventsLoading: false });
    }
  },

  fetchFinishedEvents: async () => {
    set({ eventsLoading: true });
    try {
      const data = await getFinishedEvents();
      set({ finishedEvents: data, eventsLoading: false });
    } catch {
      set({ eventsLoading: false });
    }
  },

  fetchCancelledEvents: async () => {
    set({ eventsLoading: true });
    try {
      const data = await getCancelledEvents();
      set({ cancelledEvents: data, eventsLoading: false });
    } catch {
      set({ eventsLoading: false });
    }
  },

  clearProfile: () => set({
    profile: null,
    registeredEvents: [],
    finishedEvents: [],
    cancelledEvents: [],
    error: null,
  }),
}));

export default useUserStore;