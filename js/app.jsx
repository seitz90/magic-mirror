import React from 'react'; 
import ReactDOM from 'react-dom'; 

import Weather from './container/weather.jsx'; 
import Clock from './container/clock.jsx'; 
import Calendar from './container/calendar.jsx'; 


ReactDOM.render(<Weather />, document.getElementById('weather')); 
ReactDOM.render(<Clock />, document.getElementById('clock')); 
ReactDOM.render(<Calendar />, document.getElementById('calendar')); 