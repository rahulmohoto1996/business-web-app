import axios from "axios"

const axiosApi = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});

console.log("BASE URL:", process.env.VUE_APP_BASE_URL);

export default axiosApi;