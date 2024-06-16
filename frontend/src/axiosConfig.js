import axios from "axios";

const token = localStorage.getItem("token");

axios.defaults.baseURL = "http://localhost:9000/api";
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;
