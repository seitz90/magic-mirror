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
		this.getCalendarDataIntervalId = window.setInterval(() => {
			this.getCalendarData();
		}, (config.calendar.refreshInterval * 1000));
	}

	componentWillUnmount() {
		clearInterval(this.getCalendarDataIntervalId); 
	}

	getCalendarData() {

		let calendarData = {};
		for(let i in config.calendar.icals) {
			window.fetch('/calendar/'+(parseInt(i)+1))
				.then((res) => {
					return res.json();
				})
				.then((json) => {
					Object.assign(calendarData, json); 		
				});
		}

		this.setState({
			calendarData: calendarData
		});
	}


	render() {

		if(typeof this.state.calendarData !== "undefined" && this.state.calendarData !== null) {

			let sortedCalendarData = Object.keys(this.state.calendarData).map(key => this.state.calendarData[key]); 
			sortedCalendarData.sort((a, b) => {

				if(moment(a.start).isSame(moment(b.start))) {
					return 0;
				}
				if(moment(a.start).isAfter(moment(b.start))) {
					return 1;
				}
				if(moment(a.start).isBefore(moment(b.start))) {
					return -1;
				}
			});


			let entryCounter = 0; 
			let entries = sortedCalendarData.map((entry) => {
				if(entryCounter < config.calendar.maxResults && moment(entry.start).isSameOrAfter(moment()) && entry.type === "VEVENT") {

					entryCounter++;

					let details = () => {
						if(typeof entry.end !== "undefined") {
							return (
								<div className="details">
									<span>
										<span className="day">
											<span>{moment(entry.start).format('dd, DD.MM.YY')}</span>
										</span>
									</span>
									<span>{ moment(entry.start).format('HH:mm') } - { moment(entry.end).format('HH:mm') }</span>
								</div>
							);
						}
					};

					return (
						<li key={entry.uid} className="event day-marker">
							<span className="calendar-icon">
								<i className="fa fa-calendar" aria-hidden="true"/>
							</span>
							<div className="event-details">
								<span className="summary">{entry.summary}</span>
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