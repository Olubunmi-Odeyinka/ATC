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
//  import jwt from 'jsonwebtoken';



import './App.css';
const store = configureStore();

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
