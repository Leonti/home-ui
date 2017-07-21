import React, { Component } from 'react';
import LastReading from './LastReading';
import Controls from './Controls';
import { heatingMedium, heatingHigh, coolingOn, acOff } from '../services/Ac';

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lastReading: null
    };
  }

  componentDidMount() {

    this.props.auth.getAccessToken()
      .then(accessToken =>
      fetch('/api/last-reading', {
      	method: 'GET',
      	headers: new Headers({
          'Authorization': `Bearer ${accessToken}`
      	})
      })
      .then(response => response.json()))
      .then(lastReading => {
        this.setState({lastReading})
      })
  }

  login() {
    this.props.auth.login();
  }

  authenticatedView() {
    const lastReadingView = this.state.lastReading !== null ?
      <LastReading
        temperature={this.state.lastReading.temperature}
        humidity={this.state.lastReading.humidity}
        co2={this.state.lastReading.co2}
        timestamp={this.state.lastReading.timestamp}
        /> : null;

    return (
    <div>
    {lastReadingView}
    <Controls
        onHeatingHigh={() => this.props.auth.getAccessToken()
              .then(accessToken => heatingHigh(accessToken)())
          }
        onHeatingMedium={() => this.props.auth.getAccessToken()
              .then(accessToken => heatingMedium(accessToken)())
          }
        onCooling={() => this.props.auth.getAccessToken()
              .then(accessToken => coolingOn(accessToken)())
          }
        onOff={() => this.props.auth.getAccessToken()
              .then(accessToken => acOff(accessToken)())
          }
    />
    </div>
    )
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && this.authenticatedView()
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
