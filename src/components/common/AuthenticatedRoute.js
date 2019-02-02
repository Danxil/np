import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import { pure, compose } from 'recompose';

const PrivateRoute = ({ component: Component, userInfo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
}

PrivateRoute.defaultProps = {
  userInfo: null,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
}

export default compose(withRouter, withUser(), pure)(PrivateRoute);
