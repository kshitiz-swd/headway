import axios from "axios";

const API = axios.create({
    // baseURL: 'https://headway-jufc.onrender.com/api/',
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
})

export default API
