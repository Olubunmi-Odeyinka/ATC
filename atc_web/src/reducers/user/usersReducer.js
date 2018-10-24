import * as types from '../../config/constants/actionTypes';
import initialState from '../initialState';

export default function usersReducer(state = initialState.users, action) {
    switch (action.type) {
        case types.LOAD_USERS_LIST_SUCCESSFUL:
            return action.users;

        default:
            return state;
    }
}


