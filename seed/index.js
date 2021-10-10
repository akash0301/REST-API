require('dotenv').config()

const mongoose = require("mongoose")
const Series = require("../models/series")
const series_db = require("./series")

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected!!")
});


const seedDB = async () => {
    await Series.deleteMany({});
    for (let i = 0; i < series_db.length; i++) {
		if(series_db[i].status === "")	series_db[i].status = "No Result";
        const series = new Series({
			name : series_db[i].series_name,
			status : series_db[i].status,
			season : series_db[i].season,
			updated_at : series_db[i].updated_at
		})
        await series.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});