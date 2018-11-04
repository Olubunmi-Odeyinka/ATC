import axios from 'axios';
import {BaseUrl} from './constants/urls';
import {JWT_LOCAL_KEY, USER_INFO} from "./constants/utils";

const dataApi = axios.create({
    baseURL: BaseUrl
});

dataApi.interceptors.request.use(request =>{
    //console.log(request);
    // edit request here

    //const token = localStorage.getItem(JWT_LOCAL_KEY);
    //dataApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("I gout here"); 
    return request;//push the request to calling code
},error =>{
    //console.log(error);
    // catch request error like no network here
    return Promise.reject(error); //push error to the calling code
});

dataApi.interceptors.response.use(response =>{
    //console.log(response);
    // edit request here
    //let refreshToken = dataApi.defaults.headers.common['authorization'];
    //if(refreshToken) { setAuthorizationToken(refreshToken)}
    return response;//push the request to calling code
    //Todo: Navigate to login
},error =>{
    console.log(error);
    if(error.status === 401){
        setAuthorizationToken()
    }
    // catch request error like no network here
    return Promise.reject(error); //push error to the calling code
});

export function setAuthorizationToken(token, login, logInInfoStatus) {
    if(token){
        dataApi.defaults.headers.common['authorization'] = `Bearer ${token}`;
        localStorage.setItem(JWT_LOCAL_KEY, token);
        if(logInInfoStatus){
            localStorage.setItem(USER_INFO, login);
        }else{
            localStorage.setItem(USER_INFO, JSON.stringify(login));
        }
    }else {
        if(localStorage[JWT_LOCAL_KEY]) {
            delete dataApi.defaults.headers.common['authorization'];
            localStorage.removeItem(JWT_LOCAL_KEY);
            localStorage.removeItem(USER_INFO);
        }
    }
}

export default dataApi;