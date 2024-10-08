import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://wserverget.wheelofpersia.com/lastlist"
    : "https://wserverget.wheelofpersia.com/lastlist";
    const API_URL3 =
    process.env.NODE_ENV === "production"
      ? "http://localhost:2525/lastlist"
      : "http://localhost:2525/lastlist";
const getPublicContent = (data) => {
  return axios.get(API_URL + "?l=" + data.command);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
