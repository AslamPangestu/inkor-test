import axios from "axios";

import { BASE_URL, API_KEY } from "@/config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "tasty.p.rapidapi.com",
  },
});

export const generateQuery = (obj: { [key: string]: unknown }) => {
  const query = Object.keys(obj)
    .reduce((carry, key) => {
      if (obj[key] || obj[key] === 0) {
        return carry + `${key}=${obj[key]}&`;
      }
      return carry;
    }, "")
    .replace(/&+$/, "");
  return `?${query}`;
};

export default instance;
