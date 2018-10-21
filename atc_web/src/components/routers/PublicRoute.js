import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'underscore';

const PublicRoute = ({ component: Component, userInfo: userInfo, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !_.isEmpty(userInfo) ? (
                <Redirect to="/dashboard" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

PublicRoute.propTypes = {
    userInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    userInfo: state.userInfo
});

export default connect(mapStateToProps)(PublicRoute);