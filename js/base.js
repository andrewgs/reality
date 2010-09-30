/**
 * base.js v.0.3 by Reality Group
 * Samoilovi.ru © 2010
 */
var sam = sam || {}; 
sam.global = this;
sam.movie_counter = 1;
sam.movies_quantity = null;
sam.movies = [];
sam.playerId = 'vimeo_player_holder';

sam.params = {
	allowscriptaccess: 'always',
	allowfullscreen: 'false'
};
sam.flashvars = {
	server: 'vimeo.com',
	show_title : 1,
	show_byline : 1,
	show_portrait : 0,
	color : 'bab37e',
	fullscreen : 0,
	autoplay : 0,
	js_api : 1,
	js_onLoad : 'vimeoOnLoad',
	js_swf_id : sam.playerId
};

$(function(){
	$.getJSON('http://vimeo.com/api/v2/user867882/videos.json?callback=?',function(data){
		$.each(data, function(i){
			sam.movies.push(data[i].id);
		});
		sam.movies.reverse();
		sam.flashvars.clip_id = sam.movies[0];
		sam.movies_quantity = data.length;
		swfobject.embedSWF('http://vimeo.com/moogaloop.swf', sam.playerId, 410, 240, "9.0.0", null, sam.flashvars, sam.params);
		//swfobject.embedSWF('equalizer.swf', 'sound_control_holder', 30, 25, "9.0.0", null, null, {wmode: 'transparent'});
	});

	$("#arrow-right").click(function(){
		sam.movie_counter = sam.movie_counter+1 > sam.movies_quantity ? 1 : sam.movie_counter+1;
		$("#"+sam.playerId).html('');
		sam.flashvars.clip_id = sam.movies[sam.movie_counter-1];
		swfobject.embedSWF('http://vimeo.com/moogaloop.swf', sam.playerId, 410, 240, "9.0.0", null, sam.flashvars, sam.params);
	});
	$("#arrow-left").click(function(){
		sam.movie_counter = sam.movie_counter-1 < 1 ? sam.movies_quantity : sam.movie_counter-1;
		$("#"+sam.playerId).html('');
		sam.flashvars.clip_id = sam.movies[sam.movie_counter-1];
		swfobject.embedSWF('http://vimeo.com/moogaloop.swf', sam.playerId, 410, 240, "9.0.0", null, sam.flashvars, sam.params);		
	});
});

/* must define this in global scope */
function vimeoOnLoad(playerId) {
	$('#'+playerId).get(0).api_addEventListener('onFinish', 'vimeoOnFinish');
}

/* must define this in global scope */
function vimeoOnFinish(playerId) {
	$('#'+playerId).get(0).api_seekTo(10);
}
