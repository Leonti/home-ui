import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import LastReading from './components/LastReading';
import Controls from './components/Controls';
import { heatingMedium, heatingHigh, coolingOn, acOff } from './services/Ac';
import { ledOn, ledOff } from './services/Led'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lastReading: null,
      isProcessingCommand: false,
    };
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {

    if (!this.props.auth.isAuthenticated()) {
//      this.props.auth.login()
    }

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

  onCommand(func) {
    return () => this.props.auth.getAccessToken()
            .then(accessToken => {
              this.setState({isProcessingCommand: true})
              return func(accessToken)()
            })
            .then(() => this.setState({isProcessingCommand: false}))
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
        onHeatingHigh={this.onCommand(heatingHigh)}
        onHeatingMedium={this.onCommand(heatingMedium)}
        onCooling={this.onCommand(coolingOn)}
        onAcOff={this.onCommand(acOff)}
        onLedOn={(r, g, b) => this.props.auth.getAccessToken()
              .then(accessToken => {
                this.setState({isProcessingCommand: true})
                return ledOn(accessToken)(r, g, b)
              })
              .then(() => this.setState({isProcessingCommand: false}))
          }
        onLedOff={this.onCommand(ledOff)}
        isProcessing={this.state.isProcessingCommand}
    />
    </div>
    )
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Home of En Chi and Leonti</span>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="container">
        {
          isAuthenticated() && this.authenticatedView()
        }
        {
          !isAuthenticated() && (
            <button className="btn-margin btn btn-primary" onClick={this.login.bind(this)}>Login</button>
          )
        }
        </div>
      </div>
    );
  }
}

export default App;
