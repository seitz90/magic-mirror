import React from 'react'; 
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

	componentDidMount() {
		window.setInterval(() => {
			this.getCalendarData();
		}, (config.calendar.refreshInterval * 1000));
	}

	getCalendarData() {

		console.log('CALENDAR - GET DATA'); 

		let calendarData = []; 
		config.calendar.icals.map((cal) => {
			ical.fromURL(cal, {}, (err, data) => {
				for (let k in data) {
					if(data.hasOwnProperty(k)) {
						if(typeof data[k].start !== "undefined") {
							let ev = data[k];
							calendarData.push(data[k]); 
						}
					}
				}
				this.setState({
					calendarData: calendarData.sort((a,b) => {
						return moment(a.start).isSameOrAfter(moment(b.start));
					})
				}); 
			});
		});
	}


	render() {

		if(typeof this.state.calendarData !== "undefined" && this.state.calendarData !== null) {

			let entryCounter = 0; 
			let entries = this.state.calendarData.map((entry) => {
				if(entryCounter < config.calendar.maxResults && moment(entry.start).isSameOrAfter(moment())) {
					entryCounter++;
					return (
						<li key={entry.uid} className="event day-marker">
							<div className="event-details">
								<span>
									<span className="day">
										<span>{moment(entry.end).format('dd, DD.MM')}</span>
									</span>
								</span>
								<span className="summary">{entry.summary}</span>
								<div className="details">
									<span>{ moment(entry.start).format('HH:mm') } - { moment(entry.end).format('HH:mm') }</span>
								</div>
							</div>
						</li>
					);
				}
			});

			return (
				<ul className="calendar fade">
					{entries}
				</ul>
			);
		} else {
			return null; 
		}
	}
}

export default Calendar; 