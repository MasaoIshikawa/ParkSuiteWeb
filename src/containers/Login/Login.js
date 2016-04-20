import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {LoginForm} from 'components';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    signup: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    let success = false;
    const loginFunc = this.props.login;
    const Swagger = require('swagger-client');
    new Swagger({
      url: 'https://api-staging.parksuiteapp.com/v1/swagger',
      usePromise: true
    })
    .then(function(client) {
      client.auth.emailLogin({credentials: {email: data.email, password: data.password}}, {responseContentType: 'application/json'})
        .then(function(auth) {
          success = true;
          console.log(auth);
          loginFunc(data.email);
        })
        .catch(function(error) {
          console.log('Oops!  failed with message: ' + error.statusText);
          if (!success) {
            alert(error.statusText);
          }
        });
    });
  }

  handleSignup = (event) => {
    event.preventDefault();
    window.location.assign('/signup');
  }

  handleFacebook = (event) => {
    event.preventDefault();
  }

  handleGoogle = (event) => {
    event.preventDefault();
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <LoginForm onSubmit={this.handleSubmit}/>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
