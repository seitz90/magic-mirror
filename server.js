var express = require('express'),
	exphbs = require('express-handlebars'),
	request = require('request'),
	http = require('http'),
	ical = require('ical'),
	moment = require('moment'),
	//gpio = require('rpi-gpio'),
	Gpio = require('onoff').Gpio, 
	config = require('./config.js');  

/*
gpio.on('change', function(channel, value) {
	console.log('Channel ' + channel + ' has changed, new value: ' + value); 
});

gpio.setup(13, gpio.DIR_IN, gpio.EDGE_BOTH); 
gpio.setup(23, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(16, gpio.DIR_IN, gpio.EDGE_BOTH);
*/


var pir = new Gpio(23, 'in', 'both');

pir.watch(function(err, value) {
	if(err) {
		throw err;
	}

	console.log('value: ' + value); 
});




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

var server = http.createServer(app);
var io = require('socket.io')(server);

/*
server.listen(port, function() {
	console.log('Express server listening on port ' + port); 
});
*/ 

//var io = io.listen(server); 
io.on('connection', function(socket) {
	console.log('ein neuer client hat sich verbunden'); 
	socket.emit('welcome', "Hello world"); 

	socket.on('user agent', function(data) {
		console.log('empfange daten...'); 
		console.log(data); 
	});
});

server.listen(port, function() {
	console.log('Express server listening on port ' + port); 
});
