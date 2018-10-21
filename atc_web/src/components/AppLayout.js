/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Switch, Route } from 'react-router-dom';
import homePage from './modules/home/HomePage';
import NotFoundPage from './NotFoundPage';
import Header from './common/page/header/Header';
import Footer from './common/page/footer/Footer';
import Spinner from './common/page/spinner/Spinner';
import Modal from './common/page/modal/Modal';
import {connect} from 'react-redux';
import rolesPage from "./modules/roles/RolesPage";
import usersPage from "./modules/users/UsersPage";
import vendorsPage from "./modules/vendors/VendorsPage";
import accessmentsPage from "./modules/accessments/AssessmentsPage";
import systemCodesPage from "./modules/systemCode/SystemCodesPage";
import vendorContracts from "./modules/vendors/VendorContractsPage";
import contractsPage from "./modules/contracts/ContractsPage";
import preContractTracking from "./modules/activity/PreContractsPage";
import postContractTracking from "./modules/activity/PostContractsPage";
import activityLog from "./modules/activity/ActivityLogsPage";
import activityFilter from "./modules/activity/ActivityFilterPage";
import manageVendorPage from "./modules/vendors/ManageVendorPage";
import manageUserPage from "./modules/users/ManageUserPage";
import manageRolePage from "./modules/roles/ManageRolePage";
import manageSystemCodePage from "./modules/systemCode/ManageSystemCodePage";
import manageActivityLogs from "./modules/activity/ManageActivityLogPage";
import manageAssessmentPage from "./modules/accessments/ManageAssessmentPage";
import manageContractPage from "./modules/contracts/ManageContractPage";
import changePassWord from "./modules/roles/ChangePassWordPage";
import dashBoard from './modules/home/DashBoard';
import loginPage from './modules/home/LoginPage';
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.loading

class AppLayout extends React.Component {

  render() {
    const heightStyle = { minHeight: '75vh'};
    //  let display = null;
    //
    // if(this.props.loading){
    //   display = <Spinner  />
    // }
    //
    // if(!this.props.loading){
    //   display = (
    //       <Switch >
    //         <Route exact={true} path="/" component={HomePage} />
    //         <Route path="/next" component={NextPage} />
    //         <Route path="/books" component={booksPage} />
    //         <Route path="/assessments" component={accessmentsPage} />
    //         <Route path="/book/:operator/:id?" component={manageBookPage} />
    //         <Route path="/assessment/:operator/:id?" component={manageAssessmentPage} />
    //         <Route path="/filemovement/:operator/:id?" component={manageFileMovementPage} />
    //         <Route component={NotFoundPage} />
    //       </Switch>
    //   );
    // }

    return (
      <div>
        <Header  />
          <div className="pt-5 d-none d-print-block clearfix">
              <h3 className="d-inline float-left">Procurements Systems</h3>
          </div>
          <div style={heightStyle}>
            <Switch className="d-block">
                <Route exact={true} path="/" component={homePage} />
                <PublicRoute path="/login" component={loginPage} />
                <PrivateRoute path="/dashboard" component={dashBoard} />
                <PrivateRoute path="/assessments" component={accessmentsPage} userInfo={this.props.userInfo} />
                <PrivateRoute path="/systemcodes" component={systemCodesPage} />
                <PrivateRoute path="/contracts" component={contractsPage} userInfo={this.props.userInfo} />
                <PrivateRoute path="/precontracts" component={preContractTracking} />
                <PrivateRoute path="/postcontracts" component={postContractTracking} />
                <PrivateRoute path="/vendors" component={vendorsPage} />
                <PrivateRoute path="/roles" component={rolesPage} />
                <PrivateRoute path="/users" component={usersPage} />
                <PrivateRoute path="/activityFilter" component={activityFilter} />
                <PrivateRoute path="/changepassword" component={changePassWord} />
                <PrivateRoute path="/precontract/:id" component={activityLog} />
                <PrivateRoute path="/postcontract/:id" component={activityLog} />
                <PrivateRoute path="/vendor/:operator/:id?" component={manageVendorPage} />
                <PrivateRoute path="/user/:operator/:id?" component={manageUserPage} />
                <PrivateRoute path="/role/:operator/:id?" component={manageRolePage} />
                <PrivateRoute path="/vendorcontracts/:id?" component={vendorContracts} />
                <PrivateRoute path="/systemcode/:operator/:id?" component={manageSystemCodePage} />
                <PrivateRoute path="/assessment/:operator/:id?" component={manageAssessmentPage} userInfo={this.props.userInfo} />
                <PrivateRoute path="/contract/:operator/:id?" component={manageContractPage} userInfo={this.props.userInfo} />
                <PrivateRoute path="/activitylog/:operator/:id?" component={manageActivityLogs} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
          <div className="d-none d-print-block clearfix">
              <span className="d-inline float-left">printed at {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
          </div>
        <Footer />
      </div>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.element
};

function mapStateToProps(state, ownProps) {
    return {
        error: state.error,
        loading: state.loading,
        userInfo: state.userInfo,
    };
}

//export default connect(mapStateToProps)(AppLayout);
export default AppLayout;
