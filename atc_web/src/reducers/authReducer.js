import * as types from '../config/constants/actionTypes';
import initialState from "./initialState";

export default (state=initialState.auth, action) => {
  switch (action.type){
    case types.LOGIN_SUCCESS:
      return {
        auth: action.auth
      };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
