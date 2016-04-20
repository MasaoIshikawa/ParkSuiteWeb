import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import signupValidation from './signupValidation';

function asyncValidate(data) {
  // TODO: figure out a way to move this to the server. need an instance of ApiClient
  if (!data.email) {
    return Promise.resolve({});
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errors = {};
      let valid = true;
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
        errors.email = 'Email address already used';
        valid = false;
      }
      if (valid) {
        resolve();
      } else {
        reject(errors);
      }
    }, 1000);
  });
}

@reduxForm({
  form: 'signup',
  fields: ['name', 'email', 'password', 'phone', 'work'],
  validate: signupValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class SignupForm extends Component {
  static propTypes = {
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const {
      asyncValidating,
      fields: {email, password},
      handleSubmit
      } = this.props;
    const styles = require('./SignupForm.scss');
    const renderInput = (field, label, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          {label !== 'Password' && <input type="text" className="form-control" id={field.name} {...field}/>}
          {label === 'Password' && <input type="password" className="form-control" id={field.name} {...field}/>}
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(email, 'Email', true)}
          {renderInput(password, 'Password')}
          <div className="form-group">
            <div style={{textAlign: 'center', margin: 15}}>
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

