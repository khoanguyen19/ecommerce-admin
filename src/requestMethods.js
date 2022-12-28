import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const PERSIST_ROOT = JSON.parse(localStorage.getItem("persist:root"));

export const currentUser =
  PERSIST_ROOT && JSON.parse(PERSIST_ROOT?.user)?.currentUser;

const TOKEN = currentUser !== null && currentUser.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
