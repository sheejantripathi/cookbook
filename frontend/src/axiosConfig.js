import axios from "axios";
axios.defaults.baseURL = "http://localhost:9000/api";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtAccessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
