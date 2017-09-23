var request = require('request')

var imgur = {

	
	// var Client-ID = config.Client-ID;

	getImage : function(search,page,callback){
		options = {
			url: 'https://api.imgur.com/3/gallery/search/' + page + '?q=' + search,
			headers : { Authorization: 'Client-ID eb04f5960a5cae7' },
			json : true
		},

		data = request(options, function(err, res, body){
		if (!err && res.statusCode == 200) {
	    	// console.log(body)
	    	body = body.data.filter(function(x){
	    		if(x.nsfw === false && !x.is_album){
	    			return x;
	    		}
	    	}).map(function(x){
	    		return {
	    			url: x.link,
	    			snippet: x.title,
	    			context: 'https://imgur.com/'+x.id,
	    		};
	    	});
	    	// console.log(JSON.stringify(body));
	    	var imgs = body;
	    	// console.log(imgs);
	    	callback(imgs);
	    	return imgs;
	    	
	  	}
	  	else{
	  		console.log('Error retrieving image');
	  	}
	});
		console.log(JSON.stringify(data));
		// console.log(options.url);
		console.log('Image requested');
		return(JSON.stringify(data));
	}

	// getPics: function(err, res, body){
	// 	if (!err && res.statusCode == 200) {
	//     	// console.log(body)
	//     	body = body.data.filter(function(x){
	//     		if(x.nsfw === false && !x.is_album){
	//     			return x;
	//     		}
	//     	}).map(function(x){
	//     		return {
	//     			url: x.link,
	//     			snippet: x.title,
	//     			context: 'https://imgur.com/'+x.id,
	//     		};
	//     	});
	//     	// console.log(JSON.stringify(body));
	//     	var imgs = JSON.stringify(body);
	//     	// console.log(imgs);
	//     	return imgs;
	    	
	//   	}
	//   	else{
	//   		console.log('Error retrieving image');
	//   	}
	// }

};


module.exports = imgur;



