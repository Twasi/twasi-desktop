import React, { Component } from 'react';
import './App.css';
import Background from './components/background/Background.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Overview from './sites/Overview.js';
import Status from './sites/Status.js';
import Error404 from './sites/Error404.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import APIConnector from './api/APIConnector';

APIConnector.ready(() => {
  APIConnector.getUserInfo().then(response => {
    console.log(response.user.twitchAccount.email);
  })
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div> 
          <Background />
          <Sidebar />
          <Switch>
            <Route exact path='/' component={ Overview } />
            <Route path='/status' component={ Status } />
            <Route path='/' component={ Error404 } />

          </Switch>  
        </div>  
      </BrowserRouter>
    );
  }
}

export default App;
