import api from "./api";

export const registerService = async (userData) => {
  // userData: name, email, password, password_confirmation, role
  const response = await api.post("/register", userData);
  return response.data;
};
