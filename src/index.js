/**
 * This is the main entry point of the rendered application.
 *
 * It just renders the component App, which handels everything further.
 *
 * Lars Bärtschi, 27.11.2018
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './config';
import './api/APIConnector';
import './auth/AuthManager';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
