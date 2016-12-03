import React from 'react'; 
import config from '../../config.js'; 
import annyang from 'annyang'; 

class Speech extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

		let commands = {
			'hello': function() { console.log('Hello world!'); }
		};

		annyang.addCommands(commands); 
		annyang.start();
		annyang.debug(true);

	}

	render() {
		return (
			<p>Say something like "Hello"</p>
		);
	}
}

export default Speech; 