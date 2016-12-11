import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 
import io from 'socket.io-client'; 

import Weather from './weather.jsx'; 
import Clock from './clock.jsx'; 
import Calendar from './calendar.jsx'; 
import Speech from './speech.jsx'; 
import News from './news.jsx'; 

const socket = io.connect();

class AppContainer extends React.Component {

	constructor(props) {
		super(props);

		this._activateDisplay = this._activateDisplay.bind(this); 
		this.checkActivation = this.checkActivation.bind(this);

		this.state = {
			displayActive: false,
			activeUntil: null
		};
	}

	componentWillMount() {
	}

	componentDidMount() {
		socket.on('motionDetected', this._activateDisplay);

		window.setInterval(() => {
			this.checkActivation();
		}, 1000);
	}

	_activateDisplay() {
		// acitvate for XXX seconds
		let ttl = moment().add(config.motion.activeSeconds, 's'); 
		this.setState({ activeUntil: ttl.unix() }); 	
	}

	checkActivation() {
		const currentTime = moment().unix();
		console.log('check', currentTime, this.state.activeUntil); 
		if(currentTime < this.state.activeUntil) {
			this.setState({ displayActive: true }); 
		} else {
			this.setState({ displayActive: false }); 
		}
	}

	render() {
		if(this.state.displayActive) {
			return (
				<div>
					<div className="top">
						<div className="top-left">
							<Clock />
							<Calendar />
						</div>
						<div className="top-right">
							<Weather />
						</div>
					</div>

					<div className="container">
						<div className="middle-center">
							<Speech />
						</div>
						<div className="bottom-left"></div>
						<div className="bottom-right"></div>
						<div className="bottom-center">
							<News />
						</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default AppContainer; 