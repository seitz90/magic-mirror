import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 

class Mvg extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mvgData: undefined
		};

		this.getMvgData = this.getMvgData.bind(this); 
	}

	componentWillMount() {
		this.getMvgData(); 
	}

	componentDidMount() {
		this.getMvgIntervalId = window.setInterval(() => {
			this.getMvgData(); 
		}, (config.mvg.refreshInterval * 1000));
	}

	componentWillUnmount() {
		clearInterval(this.getMvgIntervalId); 
	}

	getMvgData() {
		window.fetch('/mvg')
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				this.setState({
					mvgData: json
				});
			});
	}


	render() {
		if(typeof this.state.mvgData !== 'undefined') {
			let headerData = <div>Abfahrten von {this.state.mvgData[0][0]}</div>; 

			let data = Object.keys(this.state.mvgData).map((i) => {
				if(this.state.mvgData[i][0] === 'U') {
					return (
						<div key={'mvg'+i}>
							<span>{this.state.mvgData[i][0]} - {this.state.mvgData[i][1]}</span>
							<span>{this.state.mvgData[i][2]}</span>
						</div>
					);
				}
			}); 

			return (
				<div>
					{headerData}
					{data}
				</div>
			);
		} else {
			return null; 
		}
	}
}

export default Mvg; 