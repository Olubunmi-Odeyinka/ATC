import * as types from '../config/constants/actionTypes';
import {beginAjaxCall, ajaxCallError, ajaxListCallError, beginListAjaxCall} from './ajaxStatusActions';
import axios, {setAuthorizationToken} from '../config/axios';

//import jwt from 'jsonwebtoken';


export const loginSuccess = (userInfo) => ({
  type: types.LOGIN_SUCCESS,
   userInfo: userInfo
});

export const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
});

export const loadDashBoardSuccess = (dashboard) => ({
    type: types.LOAD_DASHBOARD_LIST_SUCCESSFUL ,
    dashboard
});

export function login(login) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return axios.post('/users/login', login)
            .then(result => {
                //dispatch(loginSuccess(result));
                const token = result.data;
                if(token){
                    let userInfo = setAuthorizationToken(token, true);
                dispatch(loginSuccess(userInfo));
                }
            }).catch(error => {
                dispatch(ajaxCallError(error));
              throw(error);
        });
    }
}

export function logout(callBack) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return axios.post('/users/logout')
            .then(result => {
                dispatch(logoutSuccess(result));
                setAuthorizationToken();
                callBack();
                dispatch(logoutSuccess());
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    }
}

export function loadDashBoard() {
    return function (dispatch, getState) {
        dispatch(beginListAjaxCall());
        return axios.post('/users/dashboard')
            .then(result => {
                dispatch(loadDashBoardSuccess(result.data));
            }).catch(error => {
                dispatch(ajaxListCallError(error));
                throw(error);
            });
    }
}


