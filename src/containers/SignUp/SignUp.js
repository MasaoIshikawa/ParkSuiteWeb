import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {SignupForm} from 'components';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class SignUp extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  handleSubmit = (data) => {
    const loginFunc = this.props.login;
    let success = false;
    const Swagger = require('swagger-client');
    new Swagger({
      url: 'https://api-staging.parksuiteapp.com/v1/swagger',
      usePromise: true
    })
    .then(function(client) {
      client.users.createUser({newUser: {email: data.email, password: data.password}}, {responseContentType: 'application/json'})
        .then(function(auth) {
          console.log(auth);
          success = true;
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

  render() {
    return (
      <div className="container">
        <h1>SignUp</h1>
        <Helmet title="Sign Up"/>
        <div style={{textAlign: 'center', margin: 15}}>
            <button className="btn btn-primary" onClick={this.handleFacebook}>
              <i className="fa fa-pencil"/> Signup Facebook
            </button>
          </div>
          <div style={{textAlign: 'center', margin: 15}}>
            <button className="btn btn-primary" onClick={this.handleGoogle}>
              <i className="fa fa-pencil"/> Signup Google
            </button>
          </div>
        <SignupForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
