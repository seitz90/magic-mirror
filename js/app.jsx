import React from 'react'; 
import ReactDOM from 'react-dom'; 
import moment from 'moment'; 
import locales from 'moment/min/locales';
import config from '../config.js';

import Weather from './container/weather.jsx'; 
import Clock from './container/clock.jsx'; 
import Calendar from './container/calendar.jsx'; 
import Speech from './container/speech.jsx'; 
import News from './container/news.jsx'; 

import AppContainer from './container/AppContainer.jsx'; 

import io from 'socket.io-client'; 

moment.locale('de-de'); 


ReactDOM.render(<AppContainer />, document.getElementById('app'));

// ReactDOM.render(<Weather />, document.getElementById('weather')); 
// ReactDOM.render(<Clock />, document.getElementById('clock')); 
// ReactDOM.render(<Calendar />, document.getElementById('calendar')); 
// ReactDOM.render(<Speech />, document.getElementById('speech'));
// ReactDOM.render(<News />, document.getElementById('news')); 
