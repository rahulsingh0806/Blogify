import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://blogify-cduv.onrender.com/api/"
      : "/",
});

export default API;
