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

		let calendarData = []; 
		config.calendar.icals.map((cal) => {
			ical.fromURL(cal, {}, (err, data) => {
				for (let k in data) {
					if(data.hasOwnProperty(k)) {
						if(typeof data[k].start !== "undefined") {
							if(moment(data[k].start).isSameOrAfter(moment()) && moment(data[k].start).isBefore( moment().add(config.calendar.maxDays, 'd') ) ) {
								calendarData.push(data[k]); 	
							}
						}
					}
				}

				this.setState({
					calendarData: calendarData
				}); 

			});
		});
	}


	render() {

		if(typeof this.state.calendarData !== "undefined" && this.state.calendarData !== null) {

			let sortedCalendarData = this.state.calendarData; 
			sortedCalendarData.sort((a, b) => {
				console.log('sort', moment(a.start).format('DD.MM.YY'), moment(b.start).format('DD.MM.YY'), moment(a.start).isSameOrAfter(moment(b.start))); 
				return moment(a.start).isSameOrAfter(moment(b.start));
			});

			let entryCounter = 0; 
			let entries = sortedCalendarData.map((entry) => {
				if(entryCounter < config.calendar.maxResults && moment(entry.start).isSameOrAfter(moment())) {
					// entryCounter++;

					let details = () => {
						if(typeof entry.end !== "undefined") {
							return (
								<div className="details">
									<span>{ moment(entry.start).format('HH:mm') } - { moment(entry.end).format('HH:mm') }</span>
								</div>
							);
						}
					};

					return (
						<li key={entry.uid} className="event day-marker">
							<div className="event-details">
								<span>
									<span className="day">
										<span>{moment(entry.start).format('dd, DD.MM.YY')}</span>
									</span>
								</span>
								<span className="summary">{entry.summary.val || entry.summary}</span>
								{ details() }
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