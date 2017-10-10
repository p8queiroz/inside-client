import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { auth } from '../../services/auth';

class PrivateRoute extends Component {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,  // eslint-disable-line
    // react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line
    // react/forbid-prop-types
    history: PropTypes.object.isRequired, // eslint-disable-line
    // react/forbid-prop-types
    component: PropTypes.any.isRequired, // eslint-disable-line
    // react/forbid-prop-types
    path: PropTypes.string,
  };

  isAuthenticated = () => {
    // TODO: descomentar isso depois
    // const checkUserHasId = user => user && user.id && user.id.length > 0;
    // const user = auth.getUserInfo() ? auth.getUserInfo() : null;
    const isAuthenticated = !!auth.getToken();// !!(auth.getToken()
    // && checkUserHasId(user));

    return isAuthenticated;
  }

  render() {
    const {
      component,
      ...rest
    } = this.props;
    const { location } = this.props;

    const isUserAuthenticated = this.isAuthenticated();

    return (
      <Route
        {...rest}
        render={
          props => (
            isUserAuthenticated
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/login',
                state: { from: location } }} />
          )
        }
      />
    );
  }
}

export default withRouter(PrivateRoute);
