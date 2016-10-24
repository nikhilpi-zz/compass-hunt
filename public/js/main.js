$(document).ready(function() {
    Compass.init(function (method) {
	  console.log('Compass heading by ' + method);
	});

	Compass.watch(function (heading) {
	  $('.degrees').text(heading);
	  $('.compass').css('transform', 'rotate(' + (-heading) + 'deg)');
	});
});