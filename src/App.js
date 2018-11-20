import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Overview from './sites/Overview';
import Logout from './sites/Logout';
import Error404 from './sites/Error404';
import CommandExport from './sites/CommandExport';

import './App.css';
import Songrequests from "./sites/Songrequests";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Sidebar/>
                    <div className="App-content">
                        <Switch>
                            <Route exact path='/' component={Overview}/>
                            <Route exact path='/logout' component={Logout}/>
                            <Route exact path='/export' component={CommandExport}/>
                            <Route exact path='/songrequest' component={Songrequests}/>
                            <Route path='/' component={Error404}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
