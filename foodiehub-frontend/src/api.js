import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});

// ✅ ADD THIS INTERCEPTOR
API.interceptors.request.use((req) => {

    const token = localStorage.getItem("token");

    // ✅ STRICT CHECK
    if (token && token !== "null" && token !== "undefined") {
        req.headers.Authorization = `Bearer ${token}`;
    } else {
        delete req.headers.Authorization; // 🚨 remove bad header
    }

    return req;
});

export default API;