import axios from "axios";

const API = axios.create({
    baseURL: 'https://headway-jufc.onrender.com/api',
    withCredentials: true
})

export default API