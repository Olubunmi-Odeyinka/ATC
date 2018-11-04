import _ from 'underscore';
import * as types from '../config/constants/actionTypes';
import axios from '../config/axios';
import {beginAjaxCall, ajaxCallError, ajaxListCallError, beginListAjaxCall} from './ajaxStatusActions';

export function loadUsersSuccess(users) {
    return { type: types.LOAD_USERS_LIST_SUCCESSFUL, users};
}

export function loadUsersSuccessCount(page) {
    return { type: types.LOAD_COUNT, page};
}

export function loadUserSuccess(user) {
    return { type: types.LOAD_USER_SUCCESS, user};
}

// export function loadUserContractsSuccess(contracts) {
//     return { type: types.LOAD_CONTRACTS_LIST_SUCCESSFUL, contracts};
// }

// export function loadUserContractsSuccessCount(page) {
//     return { type: types.LOAD_COUNT, page};
// }

// export function loadContractsByUserId(tableInstance, UserID) {
//     let props = {
//         UserID: UserID,
//         page: tableInstance.page,
//         pageSize: tableInstance.pageSize,
//         sorted: tableInstance.sorted,
//         filtered: tableInstance.filtered
//     }

//     return function(dispatch) {
//         dispatch(beginAjaxCall());
//         return axios.post('/users/contracts/list', props).then(contracts => {
//             dispatch(loadUserContractsSuccess(contracts.data.rows));
//             dispatch(loadUserContractsSuccessCount({'Count':contracts.data.count, 'pageSize': props.pageSize}));
//             //Todo: loading state
//         }).catch(error => {
//             dispatch(ajaxCallError(error));
//             throw(error);
//         });
//     };

// }

export function loadUsers() {
   
    return function(dispatch) {
        dispatch(beginListAjaxCall());
        return axios.get('/users').then(users => {
            dispatch(loadUsersSuccess(users.data.rows));
            //dispatch(loadUsersSuccessCount({'Count':users.data.count, 'pageSize': props.pageSize}));
        }).catch(error => {
            dispatch(ajaxListCallError(error));
            throw(error);
        });
    };
}

export function getUserById(id) {
    return function (dispatch){
        dispatch(beginAjaxCall());
        return axios.get('/users/'+ id).then(user => {
            if(user.data){

                dispatch(loadUserSuccess(user.data));
            }
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

export function saveNewUser(user) {
    return function (dispatch, getState) {

        dispatch(beginAjaxCall());
       return axios.post('/users', user)
            .then(result => {
                dispatch(loadUserSuccess(result));
                }).catch(error => {
                    dispatch(ajaxCallError(error));
                    throw(error);
                });
    }
}

export function saveUpdateUser(user) {

    return function (dispatch) {
        dispatch(beginAjaxCall());
        return axios.patch('/users', user)
            .then(result => {
                dispatch(loadUserSuccess(result));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}

export function saveDeleteUser(user) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return axios.delete('/users/'+ user.DocumentID).then(user => {
            dispatch(loadUserSuccess(user));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}
