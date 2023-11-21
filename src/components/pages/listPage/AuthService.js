import axios from "axios";

const BASE_URL = "https://www.melivecode.com/api";
let authToken;

export const setAuthToken = (token) => {
  authToken = token;
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
      expiresIn: 60000,
    });

    authToken = response.data.token;
    return authToken;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getAuthToken = () => authToken;
