import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 

class News extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newsData: null
		};

		this.getNews = this.getNews.bind(this); 
	}


	componentWillMount() {
		this.getNews();
	}

	componentDidMount() {
		window.setInterval(() => {
			this.getNews();
		}, (config.rss.refreshInterval * 1000));
	}

	getNews() {

		window.fetch('/news')
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				this.setState({
					newsData: json
				});
			});
	}

	render() {

		if(this.state.newsData) {

			let newsArticles = this.state.newsData.map((article, i) => {
				return (
					<div key={"article"+i} className="news-title dimmed fade">
						<span>
							<i className="fa fa-rss fade"></i>
						</span>
						<span className="fade">
							{article.title}
						</span>
					</div>
				);
			});

			return (
				<div className="news">
					<p>TODO: "Zeige News an" -> mit details darstellen</p>
					<div className="fade marquee">
						{newsArticles}
					</div>
				</div>
			);
		} else {
			return null; 
		}
	}
}

export default News; 