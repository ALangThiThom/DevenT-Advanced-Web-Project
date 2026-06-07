import { create } from "zustand";
import { 
  getUserProfile, getRegisteredEvents, 
  getFinishedEvents, 
  getCancelledEvents,
  updateUserProfile,
  updatePassword
} from "../services/userService";

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
        error: err.response?.data?.message || "Can't fetch information profile",
        loading: false,
      });
    }
  },

  updateProfile: async (updateData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateUserProfile(updateData); 
      
      set({ profile: data, loading: false });
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Can't update profile information";
      set({ error: errorMsg, loading: false });
      throw err;
    }
  },

  updatePassword: async (passwordData) => {
    set({ loading: true, error: null });
    try {
      const data = await updatePassword(passwordData);
      set({ loading: false });
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Can't update password";
      set({ error: errorMsg, loading: false });
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