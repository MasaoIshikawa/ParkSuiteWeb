import React, {PropTypes} from 'react';

export default class FacebookButton extends Component {
  static propTypes = {
    fb: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.FB = props.fb;
    this.state = {
      message: ''
    };
  }
  componentDidMount() {
    this.FB.Event.subscribe('auth.logout',
      this.onLogout.bind(this));
    this.FB.Event.subscribe('auth.statusChange',
      this.onStatusChange.bind(this));
  }
  onStatusChange(response) {
    console.log( response );
    const self = this;
    if ( response.status === 'connected' ) {
      this.FB.api('/me', function() {
        const message = 'Welcome ' + response.name;
        self.setState({
          message: message
        });
      });
    }
  }
  onLogout() {
    this.setState({
      message: ''
    });
  }
  render() {
    return (
      <div>
        <div
          className="fb-login-button"
            data-max-rows="1"
            data-size="xlarge"
            data-show-faces="false"
            data-auto-logout-link="true"
          >
        </div>
        <div>{this.state.message}</div>
      </div>
    );
  }
}
