//import all of the packages needed
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");

var Spotify = new spotify({
	id: "5500e7bb8bfa469b868e7fe8457d91be",
	secret: "0925f0f0d8684f998f9b7bc39d3e1ac1"
});

console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says!");

var userInput = process.argv[2];
var userInputSecond = process.argv[3];

for (i = 4; i < process.argv.length; i++) {
	userInputSecond += '+' + process.argv[i];
}

var switchStatement = function(caseData, functionData) {
	switch(caseData) {
		case "my-tweets":
		getTweets();
		break;

		case "spotify-this-song":
		getSpotify();
		break;

		case "movie-this":
		getMovie();
		break;

		case "do-what-it-says":
		getFunct();
		break;
	}
};

var getTweets = function() {
	console.log("Here are your tweets!");
	//load keys from keys.js
	var client = new twitter(keys);

	var userInfo = {
		screen_name: 'GooberBurger',
		count: 10
	};

	client.get("statuses/user_timeline", userInfo, function(error, tweets, response) {
		if (!error) {
			for (i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log("");
				console.log(tweets[i].text);
				console.log("----------------------");
			}
		};
	});
};

var getArtistNames = function(artist) {
	return artist.name;
};

var getSpotify = function(songName) {
	if (songName === undefined) {
		songName = "Zombie";
	}

	Spotify.search(
	{
		type: "track",
		query: songName
	},
	function(err, data) {
		if (err) {
			console.log("Error occurred: " + err);
			return;
		}

		var songs = data.tracks.items;

		for (var i = 0; i < songs.length; i++) {
			console.log(i);
			console.log("artist(s): " + songs[i].artists.map(getArtistNames));
			console.log("song name: " + songs[i].name);
			console.log("preview song: " + songs[i].preview_url);
			console.log("album: " + songs[i].album.name);
			console.log("--------------------------------------");
		}
	});
};
	

var getMovie = function(movieName) {
	console.log("What's Your Favorite Movie?");

	var searchMovie;
	if (userInputSecond === undefined) {
		searchMovie = "Earth Girls Are Easy";
	}else {
		searchMovie = userInputSecond;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie + "&y=&plot=full&tomatoes=true&apikey=40e9cece";
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("Title: " + JSON.parse(body)["Title"]);
			console.log("Year: " + JSON.parse(body)["Year"]);
			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
			console.log("Country: " + JSON.parse(body)["country"]);
			console.log("Language: " + JSON.parse(body)["language"]);
			console.log("Plot: " + JSON.parse(body)["plot"]);
			console.log("Actors: " + JSON.parse(body)["actors"]);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
		}
	});
};

var getFunct = function() {
	console.log("random.txt");
	fs.readFile("random.txt", "utf8", function(error, data) {
		console.log(data);

		var dataArr = data.split(",");

		if (dataArr.length === 2) {
			switchStatement(dataArr[0], dataArr[1]);
		}
		else if (dataArr.length === 1) {
			switchStatement(dataArr[0]);
		}
	});
};

var runProg = function(argOne, argTwo) {
	switchStatement(argOne, argTwo);
};

runProg(process.argv[2], process.argv[3]);

switchStatement();