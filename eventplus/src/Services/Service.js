import axios from "axios";

//const apiPort = "5000";
//const localApi = `http://localhost:${apiPort}/api`;
const externalApi = `https://eventplus.azurewebsites.net/api`;

/*export*/ const api = axios.create({
    baseURL : externalApi
})

export default api;