import * as types from '../config/constants/actionTypes';

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
  return {type: types.AJAX_CALL_ERROR};
}

export function beginListAjaxCall() {
    return {type: types.BEGIN_LIST_AJAX_CALL};
}

export function ajaxListCallError() {
    return {type: types.AJAX_LIST_CALL_ERROR};
}