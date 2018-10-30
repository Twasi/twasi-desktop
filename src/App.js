import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Background from './components/background/Background.js';
import Sidebar from './components/sidebar/Sidebar.js'

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
