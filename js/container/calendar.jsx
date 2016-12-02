import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 
import ical from 'ical'; 

class Calendar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			calendarData: undefined
		};

		this.getCalendarData = this.getCalendarData.bind(this); 
	}

	componentWillMount() {
		this.getCalendarData(); 
	}

	getCalendarData() {
		console.log('get calendarData'); 

		let calendarData = []; 
		config.calendar.icals.map((cal) => {
			ical.fromURL(cal, {}, (err, data) => {
				for (let k in data) {
					if(data.hasOwnProperty(k)) {
						let ev = data[k];
						calendarData.push(data[k]); 
					}
				}
				this.setState({
					calendarData: calendarData
				}); 
			});
		});
	}


	render() {
		
		console.log('CALENDAR / Render', this.state); 

		if(typeof this.state.calendarData !== "undefined" && this.state.calendarData !== null) {

			let entryCounter = 0; 
			let entries = this.state.calendarData.map((entry) => {
				if(entryCounter < config.calendar.maxResults) {
					entryCounter++;
					return (
						<li key={entry.uid}>{ entry.summary }</li>
					);
				}
			});

			return (
				<div>
					<p>Calendar</p>
					<ul>
						{entries}
					</ul>
				</div>
			);
		} else {
			return null; 
		}
	}
}

export default Calendar; 