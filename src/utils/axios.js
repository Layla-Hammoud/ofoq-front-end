import axios from "axios";

console.log(process.env.REACT_APP_BACKEND_ENDPOINT)
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4000/"

});

export default axiosInstance;