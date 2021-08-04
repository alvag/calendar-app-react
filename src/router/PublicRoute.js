import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateRoute } from './PrivateRoute';

export const PublicRoute = ( { isAuthenticated, component: Component, ...res } ) => {
    return (
        <Route {...res}
               component={( props ) => (
                   ( isAuthenticated )
                       ? ( <Redirect to='/' /> )
                       : ( <Component {...props} /> )
               )} />
    );
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};
