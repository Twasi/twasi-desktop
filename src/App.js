import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import APIConnector from './api/APIConnector';
import Background from './components/background/Background';
import Sidebar from './components/sidebar/Sidebar';
import Overview from './sites/Overview';
import Status from './sites/Status';
import Logout from './sites/Logout';
import Error404 from './sites/Error404';
import CommandExport from './sites/CommandExport';

import './App.css';

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
                    <Background/>
                    <Sidebar/>
                    <div className="App-content">
                        <Switch>
                            <Route exact path='/' component={Overview}/>
                            <Route path='/status' component={Status}/>
                            <Route path='/logout' component={Logout}/>
                            <Route path='/export' component={CommandExport}/>

                            <Route path='/' component={Error404}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
