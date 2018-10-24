import * as types from '../config/constants/actionTypes'
import initialState from "./initialState";

export default function errorReducer(state = initialState.error, action) {
    switch (action.type) {
        default:
            return state;
    }
}
