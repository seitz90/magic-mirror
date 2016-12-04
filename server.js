var express = require('express'),
	exphbs = require('express-handlebars'),
	request = require('request'),
	http = require('http'),
	ical = require('ical'),
	moment = require('moment'),
	feed = require('feed-read'),
	config = require('./config.js');  

var app = express();
var port = process.env.PORT || 3000;
var speech = require('@google-cloud/speech')({
	projectId: config.speech.projectId,
	credentials: config.speech.apikey
}); 

app.engine('handlebars', exphbs({ defaultLayout: 'main'})) ; 
app.set('view engine', 'handlebars'); 

app.disable('etag'); 

app.use(express.static('public')); 

app.get('/', function(req, res) {
	res.render('index');
});

// Curren location
app.get('/location', function(req, res) {
	request('https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium', function(error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send(body);
		}
	});
});

// Weather
app.get('/weather/:lat/:lng', function(req, res) {
	request('https://api.forecast.io/forecast/' + config.weather.key + '/' + req.params.lat + ',' + req.params.lng + '?units=' + config.weather.units + '&lang=' + config.language, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send(body);
		}
	}); 
});

// Calendars
app.get('/calendar/:num', function(req, res) {
	res.header("Content-Type", "application/json; charset=iso-8859-1")
	request(config.calendar.icals[(req.params.num-1)], function(error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send(ical.parseICS(body));
		}
	});
});

// News
app.get('/news', function(req, res) {
	var rss = []; 
	var feedCounter = 0;
	config.rss.feeds.map(function(feedUrl) {
		feed(feedUrl, function(err, articles) {
			articles.map(function(article, articleCounter) {
				rss.push(article);
				if(articleCounter === articles.length-1 && feedCounter === config.rss.feeds.length-1) {
					res.send(JSON.stringify(rss)); 
				}
			});
			feedCounter++;
		});

	});
});

var server = http.createServer(app).listen(port, function() {
	console.log('Express server listening on port ' + port); 
});