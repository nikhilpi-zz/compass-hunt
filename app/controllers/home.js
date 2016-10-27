var express = require('express'),
  router = express.Router();
var request = require('request');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/cute_things', function (req, res, next) {
	request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=red+panda', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var img = JSON.parse(body).data.image_url;
			console.log(img)
			res.render('cute',{img: img});
		}
	}) 
});


router.get('/help', function (req, res, next) {
    res.render('help');
});





