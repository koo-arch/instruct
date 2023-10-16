import axios from 'axios';

export const server = "http://127.0.0.1:8000"

const instance = axios.create({
    baseURL: server +  "/api/v1",
});

export default instance;