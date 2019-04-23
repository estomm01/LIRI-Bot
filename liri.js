require("dotenv").config();
 let keys = require("./keys.js");
 let inquirer = require("inquirer");
 let Spotify = require('node-spotify-api');
 let spotify = new Spotify(keys.spotify);
 let axios = require("axios");
 let moment = require('moment');

// let Spotify = require('node-spotify-api');
// let request = require('request');
// let fs = require('fs');
// let keys = require("./keys.js");
// let dotenv = require("dotenv").config();
// console.log(keys);

// //moment js
// let moment = require('moment');


// //spotify keys
// var spotify = new Spotify(keys.spotify);
// var omdbKey = keys.omdb.api_key;

//variable for input
var command = process.argv[2];
var input = process.argv[3];


//console.log(commandParam);

switch (command) {
	case 'spotify-this-song':
		//If user has not specified a song , use default
		if (commandParam === undefined) {
			commandParam = "The Sing Ace of Base";
		}
	 spotifyThis(commandParam); break;
	default:
		break;
};

function spotifyThis(song) {
	spotify.search({ type: 'track', query: song }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		else {
			for (var i = 0; i < data.tracks.items.length; i++) {

				var musicQuery = data.tracks.items[i];
				// console.log("===============================");
				// * Artist(s)
				console.log("Artist" + musicQuery.artists[0].name);
				//The song's name
				console.log("name" + musicQuery.name);
				// preview link of the song from Spotify
				console.log("preview URL" + musicQuery.preview_url);
				//The album that the song is from
				console.log("Album" + musicQuery.album.name);
				console.log("-----------------");
			};
		};
	});

	// function omdb(movie){

	// 	var queryUrl = "http://www.omdbapi.com/?t" +
}
//Do what it says reads text from random.txt file, command is ran
var doWhatItSays = function () {
	fs.readFile("random.txt", "utf8", function (err, data) {
		if (err) throw err;
		var randomText = data.split(",");

		if (randomText.length == 2) {
			ask(randomText[0], randomText[1]);
		}
		else if (randomText.length == 1) {
			ask(randomText[0]);
		}
	});
}
