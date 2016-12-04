import React from 'react'; 
import ReactDOM from 'react-dom'; 
import moment from 'moment'; 
import locales from 'moment/min/locales';

import Weather from './container/weather.jsx'; 
import Clock from './container/clock.jsx'; 
import Calendar from './container/calendar.jsx'; 
import Speech from './container/speech.jsx'; 
import News from './container/news.jsx'; 

moment.locale('de-de'); 


ReactDOM.render(<Weather />, document.getElementById('weather')); 
ReactDOM.render(<Clock />, document.getElementById('clock')); 
ReactDOM.render(<Calendar />, document.getElementById('calendar')); 
ReactDOM.render(<Speech />, document.getElementById('speech'));
ReactDOM.render(<News />, document.getElementById('news')); 