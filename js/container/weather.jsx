import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 

class Weather extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			weather: undefined
		};

		this.getWeather = this.getWeather.bind(this); 
	}

	componentWillMount() {
		this.getWeather(); 
	}

	componentDidMount() {
		window.setInterval(() => {
			this.getWeather(); 
		}, (config.weather.refreshInterval * 1000));
	}

	getWeather() {
		console.log('get weather neu'); 
		// get geodata
		// window.fetch('https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium')
		window.fetch('/location')
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				if(json.status === "OK") {
					// Receive weather data
					//window.fetch('https://api.forecast.io/forecast/' + config.weather.key + '/' + json.location.lat + ',' + json.location.lng + '?units=' + config.weather.units + '&lang=' + config.language)
					window.fetch('/weather/' + json.location.lat + '/' + json.location.lng)
						.then((weatherRes) => {
							return weatherRes.json();
						})
						.then((weatherJson) => {
							this.setState({
								weather: weatherJson
							});
						});
				}
			});
	}


	render() {
		
		console.log('WETTER / Render', this.state); 

		if(typeof this.state.weather !== "undefined" && this.state.weather !== null) {

			let weeklyForecastCounter = 0; 
			let weeklyForecast = this.state.weather.daily.data.map((day) => {
				weeklyForecastCounter++;
				if(weeklyForecastCounter > 1) {
					return (
						<div key={"weather-forecast-" + day.time} className="weather-week-day">
							<span className="day light-grey">{ moment.unix(day.time).format("dd") }</span>
							<canvas id={"icon_weather_1"} width="33" height="25"></canvas>
							<span className={"icon-small dimmed wi wi-fw wi-forecast-io-" + day.icon}></span>
							<span className="temperature temperature-min">{ Math.round(day.temperatureMin) } &deg;</span>
							<span className="temperature temperature-max">{ Math.round(day.temperatureMax) } &deg;</span>
						</div>
					);
				} else {
					return null;
				}
			});

			return (
				<div className="weather">
					<div className="weather-today">
						<span className={"icon dimmed wi wi-forecast-io-" + this.state.weather.currently.icon}></span>
						<canvas id="icon_weather_current" width="90" height="70"></canvas>
						<span className="temperature">{ parseFloat(this.state.weather.currently.temperature).toFixed(1) }&deg;</span>
					</div>
					<div className="weather-week-descriptor">
						<span>{ this.state.weather.hourly.summary } </span>
						<span>{ this.state.weather.daily.summary }</span>
					</div>
					<div className="weather-week">
						{ weeklyForecast }
					</div>
				</div>
			);
		} else {
			return null; 
		}
	}
}

export default Weather; 