import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import {SignupForm} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class SignUp extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('signup', {});
  }

  handleInitialize = () => {
    this.props.initialize('signup', {
      name: 'Little Bobby Tables',
      email: 'bobby@gmail.com',
      occupation: 'Redux Wizard',
      currentlyEmployed: true,
      sex: 'male'
    });
  }

  render() {
    return (
      <div className="container">
        <h1>SignUp</h1>
        <Helmet title="Sign Up"/>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <SignupForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
