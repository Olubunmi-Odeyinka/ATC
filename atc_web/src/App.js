import React, { Component } from 'react';

import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './config/configureStore';
import {beginAjaxCall, ajaxCallError} from './actions/ajaxStatusActions';
import Root from './components/Root';

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'font-awesome/css/font-awesome.min.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import 'toastr/build/toastr.css';
import {setAuthorizationToken} from "./config/axios";
import {JWT_LOCAL_KEY, SALT_KEY, USER_INFO} from "./config/constants/utils";
import {loginSuccess} from "./actions/homeActions";

import './App.css';
import { userInfo } from 'os';
const store = configureStore();

if(localStorage[JWT_LOCAL_KEY]) {
  setAuthorizationToken(localStorage[JWT_LOCAL_KEY]);
  if(localStorage[userInfo]) {
    store.dispatch(loginSuccess(localStorage[USER_INFO]));
  }
}


class App extends Component {
  render() {
    return (
        <AppContainer>
          <Root store={store} history={history} />
        </AppContainer>
    );
  }
}

export default App;
