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
