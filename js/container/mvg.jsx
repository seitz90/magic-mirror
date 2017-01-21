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
			let data = Object.keys(this.state.mvgData).map((i) => {
				if(this.state.mvgData[i].length === 3) {


					if(parseInt(this.state.mvgData[i][2]) < 30) {
						return (
							<tr key={'mvg'+i}>
								<td>{this.state.mvgData[i][0]}</td>
								<td>{this.state.mvgData[i][1]}</td>
								<td>{this.state.mvgData[i][2]}</td>
							</tr>
						);
					}
				}
			}); 

			return (
				<div className="mvg">
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Richtung</th>
								<th>Abfahrt</th>
							</tr>
						</thead>
						<tbody>
							{data}
						</tbody>
					</table>
				</div>
			);
		} else {
			return null; 
		}
	}
}

export default Mvg; 