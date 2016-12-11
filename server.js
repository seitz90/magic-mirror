var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	exphbs = require('express-handlebars'),
	request = require('request'),
	http = require('http'),
	ical = require('ical'),
	moment = require('moment'),
	feed = require('feed-read'),
	config = require('./config.js');

// listen to port 3000
server.listen(config.port);

// Use handlebars as template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'})) ; 
app.set('view engine', 'handlebars'); 

app.disable('etag'); 

app.use(express.static('public')); 

// Index route
app.get('/', function(req, res) {
	res.render('index');
});

// Current location
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

// Create socket.io
io.sockets.on('connection', function (socket) {
	console.log('Client verbunden!'); 
});

if(process.platform !== "darwin") {
	// it runs on my raspberry, not on my mac!
	var Gpio = require('onoff').Gpio;
	var pir = new Gpio(23, 'in', 'both');
	pir.watch(function(err, value) {
		if(err) {
			throw err;
		}
		if(value === 1) {
			// Send motion detected signal to activate the display
			io.sockets.emit('motionDetected');
		}
		console.log('Motion Sensor Value: ' + value); 
	});
}

console.log('Der Server läuft nun unter http://localhost:' + config.port + '/');
