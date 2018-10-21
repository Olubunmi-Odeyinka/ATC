import * as types from '../../config/constants/actionTypes';
import initialState from '../initialState';

export function authReducer(state = initialState.userInfo, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return action.userInfo;

        case types.LOGOUT_SUCCESS:
            return {};

        default:
            return state;
    }
}

export function dashBoardReducer(state = initialState.dashboard, action) {
    switch (action.type) {
        case types.LOAD_DASHBOARD_LIST_SUCCESSFUL:
            return action.dashboard;

        default:
            return state;
    }
}