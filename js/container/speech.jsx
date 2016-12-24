import React from 'react'; 
import config from '../../config.js'; 
import annyang from 'annyang'; 

class Speech extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			speechRecognized: null,
			speechResponse: null
		};
		this.updateSpeechRecognition = this.updateSpeechRecognition.bind(this);
		this.showHelp = this.showHelp.bind(this); 
		this.iknow = this.iknow.bind(this);
		this.clearSpeech = this.clearSpeech.bind(this);
	}

	componentDidMount() {}

	showHelp() {
		this.setState({
			speechResponse:"Bislang nichts..."
		});
	}

	iknow() {
		this.setState({
			speechResponse: "Ja, ich weiß... Hilft ja nix!"
		})
	}

	clearSpeech() {
		this.setState({
			speechResponse: null
		})
	}

	updateSpeechRecognition(text) {
		this.setState({
			speechRecognized: text
		}); 
	}


	render() {
		return (
			<div className="speech">
				<div className="response">
					{this.state.speechResponse}
				</div>
			</div>
		);
	}
}

export default Speech; 
