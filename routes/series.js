const express = require('express')
const router = express.Router();
const Series = require('../models/series')

// get all the series
router.get('/', async (req, res) => {
	try{
		// let size = await Series.countDocuments({});
		// console.log(size);
		const series = await Series.find();
		res.json(series)
	} catch(err) {
		// 500 range means there is something wrong the server-side
		res.status(500).json( { message : err.message })
	}
})

// get series with id
router.get('/:id', async (req, res) => {
	try{
		// set new to true to return the updated document
		const series = await Series.findOne({id : req.params.id});
		if(series === null){
			res.status(400).json({ message : "Couldn't find a series"})
		}
		else	res.status(200).json(series);
	} catch(err) {
		res.status(400).json({ message : err.message})
	}
})

// post a series
router.post('/', async (req, res) => {

	const series = new Series({
		id : req.body.id,
		name : req.body.name,
		status : req.body.status,
		season : req.body.season,
	})

	try{
		const newSeries = await series.save();
		//successful
		res.status(201).json(newSeries)
	} catch(err) {
		// unsuccessful
		res.status(400).json({ message : err.message })
	}
})

// update a series
router.put('/:id', async (req, res) => {
	try{
		// set new to true to return the updated document
		const series = await Series.findOneAndUpdate({ id : req.params.id}, req.body, {new : true})
		if(series === null){
			res.status(400).json({ message : "Couldn't find a series to update"})
		}
		else	res.status(200).json(series);
	} catch(err) {
		res.status(400).json({ message : err.message})
	}
})

// delete a series
router.delete('/:id', async (req, res) => {
	try{
		// set new to true to return the updated document
		const series = await Series.findOneAndDelete({ id : req.params.id})
		if(series === null){
			res.status(400).json({ message : "Couldn't find a series to delete"})
		}
		else	res.status(200).json({message : "Series deleted successfully"});
	} catch(err) {
		res.status(400).json({ message : err.message})
	}
})

module.exports = router