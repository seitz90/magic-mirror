import React from 'react'; 
import ReactDOM from 'react-dom'; 
import config from '../../config.js'; 
import moment from 'moment'; 

class News extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newsData: null,
			display: 0
		};

		this.getNews = this.getNews.bind(this); 
		this.switchNews = this.switchNews.bind(this);
	}


	componentWillMount() {
		this.getNews();
	}

	componentDidMount() {
		window.setInterval(() => {
			this.getNews();
		}, (config.rss.refreshInterval * 1000));

		window.setInterval(() => {
			this.switchNews();
		}, (config.rss.slideInterval * 1000));

	}

	switchNews() {
		if(this.state.newsData) {
			let next = this.state.display + 1;
			if(next > this.state.newsData.length - 1) {
				next = 0;
			}
			this.setState({ display: next }); 
		}
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
					<span key={"article"+i}  ref={"news-item-" + i} className={"news-title news-item " + ( this.state.display === i ? 'show' : 'hide' ) }>
							{article.title}
					</span>
				);
			});

			return (
				<div className="news">
					{newsArticles}
				</div>
			);
		} else {
			return null; 
		}
	}
}

export default News; 