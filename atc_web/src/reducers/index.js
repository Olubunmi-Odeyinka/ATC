import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import auth from './authReducer'
import error from './errorReducer';
import {authReducer, dashBoardReducer} from './home/homeReducer';
import loadingReducer from "./loadingReducer";
import user from './user/userReducer';
import users from './user/usersReducer';



const rootReducer = combineReducers({
  userInfo:authReducer,
  dashboard: dashBoardReducer,
  auth,
  ajaxCallsInProgress,
  routing: routerReducer,
  error,
  user,
  users,
    loading: loadingReducer
});

export default rootReducer;

