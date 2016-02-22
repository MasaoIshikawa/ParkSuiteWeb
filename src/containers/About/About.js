import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { MiniInfoBar } from 'components';
import { FacebookButton } from 'components';

export default class About extends Component {
  state = {
    showKitten: false
  }
  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});
  testFunc = () => {
    const Swagger = require('swagger-client');
    const client = new Swagger({
      url: 'https://api-staging.parksuiteapp.com/v1/swagger',
      success: function() {
        client.auth.emailLogin( {credentials: {email: 'masaooutlook.com', password: 'Gifwurgi1'}}, {responseContentType: 'application/json'}, function(auth) {
          console.log('auth', auth);
        });
      }
    });
  }
  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us"/>

        <p>This project was originally created by Erik Rasmussen
          (<a href="https://twitter.com/erikras" target="_blank">@erikras</a>), but has since seen many contributions
          from the open source community. Thank you to <a
            href="https://github.com/erikras/react-redux-universal-hot-example/graphs/contributors"
            target="_blank">all the contributors</a>.
        </p>

        <h3>Mini Bar <span style={{color: '#aaa'}}>(not that kind)</span></h3>

        <p>Hey! You found the mini info bar! The following component is display-only. Note that it shows the same
          time as the info bar.</p>

        <MiniInfoBar/>

        <FacebookButton/>

        <h3>Images</h3>

        <p>
          Psst! Would you like to see a kitten?

          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}</button>

          <button className={'btn btn-primary'}
                style={{marginLeft: 50}}
                onClick={this.testFunc}>API
          </button>

          <button className={'btn btn-primary'}
                style={{marginLeft: 50}}
                onClick={this.testFunc}>Facebook Login
          </button>
        </p>
        {showKitten && <div><img src={kitten}/></div>}
      </div>
    );
  }
}
