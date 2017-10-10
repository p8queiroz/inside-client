import React from 'react';
import {
  Route,
  Switch, // Redirect
} from 'react-router-dom';
import {
  // app:
  // App,
  // non protected views
  Login,
  // protected views
  Home,
} from '../containers';
// import { PageNotFound } from '../views';
// import { auth } from '../services/auth';
import { PrivateRoute } from '../components';

// import LogoutRoute from '../components/logoutRoute/LogoutRoute';

export const MainRoutes = () => (
  <Switch>
    {/* non protected views
    <Route exact path="/" component={Home} /> */}
    <Route path="/login" component={Login} />
    {/* logout: just redirects to home (App will take
    care of removing the token)
    <LogoutRoute path="/logout" /> */}
    {/* protected views */}
    <PrivateRoute path="/home" component={Home} />
    {/* page not found
    <Route path="*" component={PageNotFound} /> */ }
  </Switch>
);

export default MainRoutes;
