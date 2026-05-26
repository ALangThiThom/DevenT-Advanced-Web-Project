import api from "../utils/api";

/**
 * Authenticate user with email and password.
 */
export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

/**
 * Register a new user account (organizer or attendee).
 */
export const register = async (data) => {
  const response = await api.post("/register", data);
  return response.data;
};

/**
 * Invalidate the current user session/token.
 */
export const logout = async () => {
  // Note: Using POST instead of DELETE because Laravel Sanctum's default
  // logout implementation often relies on POST for CSRF protection in SPAs.
  const response = await api.post("/logout");
  return response.data;
};

/**
 * Fetch the Google OAuth redirection URL from the backend.
 */
export const getGoogleAuthUrl = async () => {
  const response = await api.get("/auth/google/url");
  return response.data;
};

/**
 * Process the callback from Google OAuth to complete login/registration.
 * @param {string} queryString - The URL search params returned by Google.
 */
export const handleGoogleCallback = async (queryString) => {
  const response = await api.get(`/auth/google/callback${queryString}`);
  return response.data;
};
