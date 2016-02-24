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
    signup: PropTypes.func
  }

  handleLogin = (data) => {
    event.preventDefault();
    window.alert('Data submitted! ' + data.email);
    this.props.login('Bram');
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
          <div style={{textAlign: 'center', margin: 15}}>
            <button className="btn btn-primary" onClick={this.handleFacebook}>
              <i className="fa fa-pencil"/> Facebook
            </button>
          </div>
          <div style={{textAlign: 'center', margin: 15}}>
            <button className="btn btn-primary" onClick={this.handleGoogle}>
              <i className="fa fa-pencil"/> Google
            </button>
          </div>
          <LoginForm onSubmit={this.handleLogin}/>
          <div style={{textAlign: 'center', margin: 15}}>
            <button className="btn btn-primary" onClick={this.handleSignup}>
              <i className="fa fa-pencil"/> Sign up
            </button>
          </div>
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
