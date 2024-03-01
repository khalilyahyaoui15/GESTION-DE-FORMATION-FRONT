import api from "./api";

export const login = (body) => {
  return api.post("/auth/login", body);
};
