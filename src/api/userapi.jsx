import API from "./api";

// REGISTER
// ✅ CORRECT
export const registerUser = (data) =>
  API.post("/users", data);

// LOGIN
export const loginUser = (data) =>
  API.post("/users", data);