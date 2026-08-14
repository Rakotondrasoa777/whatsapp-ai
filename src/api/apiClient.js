import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

const apiClient = axios.create({
    baseURL: process.env.BASE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default apiClient;