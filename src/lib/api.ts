import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3978",
});

export default API;
