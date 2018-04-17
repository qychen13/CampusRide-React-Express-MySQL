import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          {
              !isAuthenticated() && (
                  <button
                    id="qsLoginBtn"
                    class="btn"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </button>
                )
            }
            {
              isAuthenticated() && (
                  <button
                    id="qsLogoutBtn"
                    className="btn"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </button>
                )
            }
        </p>
      </div>
    );
  }
}

export default App;
