import axios from "axios";

const baseUrl = import.meta.env.VITE_base_url

const instance = axios.create({
    baseUrl: baseUrl
})

export default instance;