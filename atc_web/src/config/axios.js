import axios from 'axios';
import {BaseUrl} from './constants/urls';
import {JWT_LOCAL_KEY, SALT_KEY} from "./constants/utils";
import jwt from 'jsonwebtoken';

const dataApi = axios.create({
    baseURL: BaseUrl
});

dataApi.interceptors.request.use(request =>{
    //console.log(request);
    // edit request here
    return request;//push the request to calling code
},error =>{
    //console.log(error);
    // catch request error like no network here
    return Promise.reject(error); //push error to the calling code
});

dataApi.interceptors.response.use(response =>{
    //console.log(response);
    // edit request here
    let refreshToken = dataApi.defaults.headers.common['authorization'];
    if(refreshToken) { setAuthorizationToken(refreshToken)}
    return response;//push the request to calling code
    //Todo: Navigate to login
},error =>{
    console.log(error);
    if(error.response.status ===401){
        setAuthorizationToken(undefined)
    }
    // catch request error like no network here
    return Promise.reject(error); //push error to the calling code
});

export function setAuthorizationToken(token, returnDecoded) {
    if(token){
        dataApi.defaults.headers.common['authorization'] = token;
        localStorage.setItem(JWT_LOCAL_KEY, token);
        if(returnDecoded) {
            return jwt.decode(token, SALT_KEY);
        }
    }else {
        if(localStorage[JWT_LOCAL_KEY]) {
            delete dataApi.defaults.headers.common['authorization'];
            localStorage.removeItem(JWT_LOCAL_KEY);
        }
    }
}

export default dataApi;