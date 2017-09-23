var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
var mongodb = require('mongodb').MongoClient;
// var mLab = 'mongodb://localhost:27017/img-abstraction-layer';
// var mLab = 'mongodb://<Cosias>:<CmySh0rts!>@ds149134.mlab.com:49134/img-abstraction-history'
var imgur = require('../services/imgur');

/*Needed for Heroku Deployment*/
// var host = process.env['host'];
// var name = process.env['name'];
// var mLab = 'mongodb://' + host + '/' + name;

/*Needed for Local Use*/
var config = require('../config');
var mLab = 'mongodb://' + config.db.host + '/'+ config.db.name;

var searchHistory = require('../models/searchHistory');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || mLab);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Search Abstraction Layer ' });
});

// router.get('/recentSearches', function(req,res){
// 	searchHistory.find({},(err, data)=>
// 		{res.json(data);});
// });

router.get('/recentSearches', function(req,res){
	searchHistory.find({}).sort('-searchDate').limit(10).exec(function(err,data){
		res.json(data);
	});
});

/* GET img search query*/
router.get('/search*/:q', function(req,res){
	// mongodb.connect(mLab,function(err,db){
	// 	if(err){
	// 		console.error("Failed to connect to server", err);
	// 	}
	// 	else{
	// 		console.log("Connnected to server");

	// 		var collection = db.collection("imgHistory");
	// 		var params = req.params.q;
	// 		var offset = req.query.offset;
	
	// 		var images = imgur.getImage(params, 1, offset, function(x){res.json(x)});
	// 		console.log(images);

	// 		var data = new searchHistory({
	// 			searchVal,
	// 			searchDate: new Date()
	// 		});

	// 		data.save(err=>{
	// 			if(err){
	// 				res.send('Error saving to database');
	// 			}
	// 		});

	// 	}
	// });

	// var collection = db.collection("imgHistory");
	var searchVal = req.params.q;
	var offset = req.query.offset;
	
	var images = imgur.getImage(searchVal, offset, function(x){res.json(x)});
	
	console.log(images);

	var data = new searchHistory({
		searchVal,
		searchDate: new Date()
	});

	data.save(err=>{
		if(err){
			res.send('Error saving to database');
		}
	});
	
});

module.exports = router;
