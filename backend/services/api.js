import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // This adds /api automatically
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;