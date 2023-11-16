import axios from "axios";

const apiPort = "5000";
const localApi = `http://localhost:${apiPort}/api`;
const externalApi = null;

/*export*/ const api = axios.create({
    baseURL : localApi
})

export default api;