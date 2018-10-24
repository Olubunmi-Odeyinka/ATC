import * as types from '../config/constants/actionTypes';
import initialState from "./initialState";

function actionTypeEndsInSuccessful(type) {
    return type.substring(type.length - 15) === 'LIST_SUCCESSFUL' ;//|| type.substring(type.length - 11) === 'LIST_FAILURE'
}
//
// function actionTypeEndsListRequest(type) {
//     return type.substring(type.length -12) === 'LIST_REQUEST';
// }

export default function loadingReducer(state = initialState.loading, action) {
        if(actionTypeEndsInSuccessful(action.type) || action.type === types.AJAX_LIST_CALL_ERROR) {
            return false;
        } else if ( action.type === types.BEGIN_LIST_AJAX_CALL ) {
            return true;
        } else {
            return state;
        }
}
