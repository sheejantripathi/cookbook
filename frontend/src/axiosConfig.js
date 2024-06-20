import axios from "axios";
axios.defaults.baseURL = "https://2efc-89-205-227-35.ngrok-free.app/api";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtAccessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // Add your headers here
    axios.defaults.headers.common["Accept"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
