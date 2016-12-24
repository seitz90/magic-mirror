import React from 'react'; 
import ReactDOM from 'react-dom'; 
import moment from 'moment'; 
import locales from 'moment/min/locales';
moment.locale('de-de'); 
import config from '../config.js';
import AppContainer from './container/appContainer.jsx'; 

ReactDOM.render(<AppContainer />, document.getElementById('app'));