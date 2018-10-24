/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Switch, Route } from 'react-router-dom';
import homePage from './modules/home/HomePage';
import NotFoundPage from './NotFoundPage';
import Header from './common/page/header/Header';
import Footer from './common/page/footer/Footer';
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
              <h3 className="d-inline float-left">ATC</h3>
          </div>
          <div style={heightStyle}>
            <Switch className="d-block">
                <Route exact={true} path="/" component={homePage} />
                <PublicRoute path="/login" component={loginPage} />
                <PrivateRoute path="/dashboard" component={dashBoard} />

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
