import React, { Component } from 'react';
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
          <Background />
          <Sidebar />
        </div>
      </Router>
    );
  }
}

export default App;
