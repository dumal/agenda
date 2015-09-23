var express = require('express');
//var home = require('../app/routes/home');
var load = require('express-load');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
module.exports = function () {
	var app = express();
	app.set('port', process.env.PORT || 3000);
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	app.use(express.static('./public'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	app.use(favicon('./public/favicon.ico'));
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);
	return app;
};