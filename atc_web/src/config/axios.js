import axios from 'axios';
import {BaseUrl} from './constants/urls';
import {JWT_LOCAL_KEY, USER_INFO} from "./constants/utils";

const dataApi = axios.create({
    baseURL: BaseUrl
});

dataApi.interceptors.request.use(request =>{

    console.log("I gout here"); 
    return request;//push the request to calling code
},error =>{
    return Promise.reject(error); //push error to the calling code
});

dataApi.interceptors.response.use(response =>{
    return response;//push the request to calling code
},error =>{
    console.log(error);
    if(error.response.status === 401){
        setAuthorizationToken()
    }
    // catch request error like no network here
    return Promise.reject(error); //push error to the calling code
});

export function setAuthorizationToken(token, login, logInInfoStatus) {
    if(token){
        dataApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        //dataApi.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type,Accept,Origin';
        localStorage.setItem(JWT_LOCAL_KEY, token);
        if(logInInfoStatus){
            localStorage.setItem(USER_INFO, login);
        }else{
            localStorage.setItem(USER_INFO, JSON.stringify(login));
        }
    }else {
        if(localStorage[JWT_LOCAL_KEY]) {
            delete dataApi.defaults.headers.common['Authorization'];
            localStorage.removeItem(JWT_LOCAL_KEY);
            localStorage.removeItem(USER_INFO);
        }
    }
}

export default dataApi;