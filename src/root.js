import React from 'react';
// import {
//   // BrowserRouter as Router,
//   Route,
// } from 'react-router-dom';

import {
  ConnectedRouter,
  // routerReducer,
  // routerMiddleware
} from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './services/apollo';

import configureStore from './redux/store/configureStore';
// import App from './containers/app/App';

// import Home from './containers/home';
// import Login from './containers/login';
import { MainRoutes } from './routes/MainRoutes';

const store = configureStore();
const history = createHistory();
// const syncedHistory = syncHistoryWithStore(history, store);

const client = apolloClient;

const Root = () =>
  (
    <ApolloProvider store={store} client={client}>
      <div>
        <ConnectedRouter history={history}>
          <div>
            {/* <Route path="/home" component={Home} />
            <Route path="/login" component={Login} /> */}
            <MainRoutes />
          </div>
        </ConnectedRouter>
      </div>
    </ApolloProvider>
  );

// https://github.com/MacKentoch/react-redux-graphql-
// apollo-bootstrap-webpack-starter/blob/master/src
// /app/components/privateRoute/PrivateRoute.js
export default Root;
