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

    // Boot
    Compass.init(function (method) {
	  console.log('Compass heading by ' + method);
	});

	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.watchPosition(setCompass);
	    } else {
	        console.log("Geolocation is not supported by this browser.");
	    }
	}

	var target_lat = 37.762223;
	var target_long = -122.421511;

	//Refresh
	var target_bearing = 0;

	function get_target_bearing() {
		return target_bearing;
	}

	function set_target_bearing(tb) {
		console.log('Setting Bearing: '+tb)
		target_bearing = tb;
	}

	function setCompass(position) {
		var current_lat = position.coords.latitude;
		var current_long = position.coords.longitude;

		var tb = bearing(current_lat, current_long, target_lat,target_long)
		set_target_bearing(tb);
	}

	Compass.watch(function (heading) {
		var tb = get_target_bearing();
		$('.degrees').text(heading);
		console.log('In Compass: '+tb)
		$('.compass').css('transform', 'rotate(' + (-heading -tb) + 'deg)');
	});

	//RUN
	getLocation();
});

