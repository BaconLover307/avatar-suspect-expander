import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/Herculanum.ttf'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
