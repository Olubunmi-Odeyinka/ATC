import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'underscore';

const validateAccess = (routeProps, userInfo) =>{
    return !_.isEmpty(userInfo)
}

const PrivateRoute = ({ component: Component, userInfo: userInfo, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            validateAccess(props, userInfo) ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

PrivateRoute.propTypes = {
    userInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    userInfo: state.userInfo
});

export default connect(mapStateToProps)(PrivateRoute);