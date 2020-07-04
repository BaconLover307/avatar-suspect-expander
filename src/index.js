import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/Herculanum.ttf';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles'
import theme from './theme.js';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
    </ThemeProvider>, document.getElementById('root')
);
registerServiceWorker();
