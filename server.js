const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./db/connect.js');

const port = process.env.PORT || 8080;

app
	.use(bodyParser.json()).use((req, res, next) => {
		res.setHeader('Acess-Control-Allow-Origin', '*');
		next();
	})
	.use('/', require('./routes'));

mongodb.initdb((err) => {
	if(err) {
		console.log(err);
	} else {
		app.listen(port);
		console.log(`Connected to DB and listening on ${port}`);
	}
});