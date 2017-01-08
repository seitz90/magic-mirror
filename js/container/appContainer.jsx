import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 
import io from 'socket.io-client'; 
import annyang from 'annyang'; 

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
		this.speechShowWeather = this.speechShowWeather.bind(this);
		this.speechClear = this.speechClear.bind(this); 

		this.state = {
			displayActive: false,
			activeUntil: null, 
			weather: {
				showDetails: false
			}
		};
	}

	componentWillMount() {
	}

	componentDidMount() {

		let commands = {
			// '*text': this.updateSpeechRecognition
			// 'was kannst du': this.showHelp, 
			// 'das ist schlecht': this.iknow,
			// 'geh weg': this.clearSpeech
			'wie wird das wetter (*para)': this.speechShowWeather,
			'wird es (*para) regnen': this.speechShowWeather,
			'regnet es *para': this.speechShowWeather,
			'zeig mir das wetter': this.speechShowWeather,

			'geh weg': this.speechClear, 
			'schluss': this.speechClear,
			'zeige (mir) die startseite': this.speechClear,
			'mach ne fliege': this.speechClear
		};

		// annyang.setLanguage('de-DE'); 
		// annyang.addCommands(commands); 
		// annyang.start();
		// annyang.debug(true);

		socket.on('motionDetected', this._activateDisplay);

		// window.setInterval(() => {
		// 	this.checkActivation();
		// }, 1000);
	}

	speechShowWeather() {
		this.setState({
			weather: {
				showDetails: true
			}
		}); 
	}

	speechClear() {
		this.setState({
			weather: {
				showDetails: false
			}
		});
	}

	_activateDisplay() {
		// acitvate for XXX seconds
		let ttl = moment().add(config.motion.activeSeconds, 's'); 
		this.setState({ activeUntil: ttl.unix() }); 	
	}

	checkActivation() {
		const currentTime = moment().unix();
		if(currentTime < this.state.activeUntil) {
			this.setState({ displayActive: true }); 
		} else {
			this.setState({ displayActive: false }); 
		}
	}

	render() {
		// if(this.state.displayActive || navigator.platform === "MacIntel") {
			return (
				<div>
					<div className="top">
						<div className="top-left">
							<Clock />
							<Calendar />
						</div>
						<div className="top-right">
							<Weather {...this.state.weather} />
						</div>
					</div>

					<div className="container">
						<div className="middle-center"></div>
						<div className="bottom-left"></div>
						<div className="bottom-right"></div>
						<div className="bottom-center">
							<News />
						</div>
					</div>
				</div>
			);
		// } else {
		// 	return null;
		// }
	}
}

export default AppContainer; 