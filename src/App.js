import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Background from './components/background/Background.js';
import Sidebar from './components/sidebar/Sidebar.js';
import { BrowserRouter as Router } from 'react-router-dom';

import APIConnector from './api/APIConnector';

APIConnector.ready(() => {
  APIConnector.getUserInfo().then(response => {
    console.log(response.user.twitchAccount.email);
  })
});

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            Hello World :D !!
          </p>
          <Background />
          <Sidebar />
        </div>
      </Router>
    );
  }
}

export default App;
