import React, { Component } from 'react';
import './App.css';
import Background from './components/background/Background.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Overview from './sites/Overview.js';
import Status from './sites/Status.js';
import Profile from './sites/Profile.js';
import PluginStore from './sites/PluginStore.js';
import Commands from './sites/Commands.js';
import Songrequests from './sites/Songrequests.js';
import Fakechat from './sites/Fakechat.js';
import Logout from './sites/Logout.js';
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
                    <div className="App-content">
                        <Switch>
                            <Route exact path='/overview' component={ Overview } />
                            <Route path='/status' component={ Status } />
                            <Route path='/profile' component={ Profile } />
                            <Route path='/plugins' component={ PluginStore } />
                            <Route path='/commands' component={ Commands } />
                            <Route path='/songrequests' component={ Songrequests } />
                            <Route path='/fakechat' component={ Fakechat } />
                            <Route path='/docs' component={ Logout } />
                            <Route path='/' component={ Error404 } />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
