import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';

// import * as authActions from '../../redux/modules/auth';
import * as userAuthActions from '../../redux/modules/userAuth';
import Login from './Login';


/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------ */

const logUser = gql`
 mutation LoginEmail($email: String!, $password: String!) {
  LoginEmail(email: $email, password: $password) {
     token,
     error,
     email,
     name
   }
 }
`;

// 2- add mutation "logUser":
const LoginWithMutation = graphql(
  logUser,
  {
    name: 'logUserMutation',
    props: ({ ownProps, logUserMutation }) => ({
      loginUser(user) {
        /* eslint no-console:
        ["error", { allow: ["warn", "error", "log"] }] */
        console.log('######################');
        console.log('USER', user);
        // console.log('loginUser', loginUser);
        console.log('######################');
        // ownProps.setMutationLoading();

        return logUserMutation(user)
          .then(
            ({
              data: {
                LoginEmail,
              },
            }) => {
              /* eslint no-console:
              ["error", { allow: ["warn", "error", "log"] }] */
              console.log('######################');
              console.log('LoginEmail', LoginEmail);
              console.log('######################');
              ownProps.onUserLoggedIn(LoginEmail.token,
                { email: LoginEmail.email, name: LoginEmail.name });
              // ownProps.onUserLoggedIn(loginUser.token, loginUser.error);
              // ownProps.unsetMutationLoading();
              return Promise.resolve(LoginEmail);
            }
          )
          .catch(error => {
            console.log('######################');
            console.log(error);
            console.log('######################');
            // ownProps.onUserLogError(error);
            // ownProps.unsetMutationLoading();
            return Promise.reject();
          }
          );
      },
    }),
  }
)(Login);


/* -----------------------------------------
  Redux
 ------------------------------------------*/
// const mapStateToProps = state => {
//   const user = { user: state };
//   // const user = { user: state.auth.user };
//   return user;
// };

const mapStateToProps = state => ({
  // views props:
  // currentView:  state.views.currentView,
  // user Auth props:
  userIsAuthenticated: state.userAuth.isAuthenticated,
  mutationLoading: state.userAuth.mutationLoading,
  // errors:
  error: state.userAuth.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // views actions:
  // enterLogin: viewsActions.enterLogin,
  // leaveLogin: viewsActions.leaveLogin,

  // userAuth actions:
  onUserLoggedIn: userAuthActions.receivedUserLoggedIn,
  onUserLogError: userAuthActions.errorUserLoggedIn,
  setMutationLoading: userAuthActions.setLoadingStateForUserLogin,
  unsetMutationLoading: userAuthActions.unsetLoadingStateForUserLogin,
  resetError: userAuthActions.resetLogError,
},
dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(LoginWithMutation);
