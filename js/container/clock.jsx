import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 

class Clock extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			formattedTime: null,
			formattedDate: null
		};

		this.setTime = this.setTime.bind(this); 
	}


	componentWillMount() {
		this.setTime();
	}

	componentDidMount() {
		window.setInterval(() => {
			this.setTime();
		}, 1000);
	}

	setTime() {
		this.setState({
			formattedTime: moment().format('HH:mm:ss'),
			formattedDate: moment().format('dddd, DD.MM.YYYY')
		});
	}

	render() {
		console.log('CLOCK / Render'); 
		return (
			<div>
				<div className="time">{ this.state.formattedTime }</div>
				<div className="date">{ this.state.formattedDate }</div>
			</div>
		);
	}
}

export default Clock; 