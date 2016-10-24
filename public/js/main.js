$(document).ready(function() {
	// lib
	function bearing(lat1,lng1,lat2,lng2) {
        var dLon = (lng2-lng1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
        var brng = _toDeg(Math.atan2(y, x));
        return 360 - ((brng + 360) % 360);
    };

	function _toRad(deg) {
         return deg * Math.PI / 180;
    };

    function _toDeg(rad) {
        return rad * 180 / Math.PI;
    };

    var GOOGLE_API = 'AIzaSyAx8CFSF8PhmnlDHEGntwV0lORywod34pk';

    function getGoogleLocation(cb) {
    	$.post( "https://www.googleapis.com/geolocation/v1/geolocate?key="+GOOGLE_API, function( data ) {
		  cb(data);
		});
    }

    // Boot
    Compass.init(function (method) {
	  console.log('Compass heading by ' + method);
	});

    var start_lat = 37.762777;
	var start_long = -122.421079;

	var target_lat = 37.762223;
	var target_long = -122.421511;

	var target_bearing = bearing(start_lat, start_long, target_lat,target_long);


	Compass.watch(function (heading) {
		$('.degrees').text(heading);
		$('.compass').css('transform', 'rotate(' + (-heading +target_bearing) + 'deg)');
	});


	
});


