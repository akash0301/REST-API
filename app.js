// import the config from .env file
require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true});
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Database connected"));


// it allows the server to accept body as json
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// routes file
// localhost:3000/series/.. this type of url will be mapped to seriesRouter
const seriesRouter = require('./routes/series.js')
app.use('/series', seriesRouter)

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
