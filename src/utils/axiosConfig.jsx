import axios from "axios";

const axiosConfig = axios.create({
    baseURL:"http://solosync.us-east-1.elasticbeanstalk.com/api/v1.0",
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});

//list of endpoints that do not req auth - jwt tokens
const excludeEndpoints = ["/login","/status","/register","/activate"];


//request interceptor
axiosConfig.interceptors.request.use((config) => {

    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint)
    });

    if(!shouldSkipToken){
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    return config;

},(error) => {
    return Promise.reject(error);
});

//response interceptor
axiosConfig.interceptors.response.use((response) => {

    return response;

},(error) => {
    if(error.response){
        if(error.response.status === 401 || error.response.status === 403 ){
            window.location.href="/login";
        }
        else if(error.response.status === 500){
            console.error("Server error. Please try again later");
        }
    }
    else if(error.code === "ECONNABORTED"){
        console.error("Request timeout. please try again");
    }
    return Promise.reject(error);

});

export default axiosConfig;