require("dotenv").config();
let keys = require("./keys.js");
//  let inquirer = require("inquirer");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let axios = require("axios");
let omdbKey = keys.omdb.api_key;
let moment = require('moment');
// let Spotify = require('node-spotify-api');
// let request = require('request');
// let fs = require('fs');
// let keys = require("./keys.js");
// let dotenv = require("dotenv").config();
// console.log(keys);

// //moment js
var command = process.argv[2];
var secondCommand = process.argv[3];
//console.log(commandParam);
switch (command) {

	case 'concert-this':
		if (secondCommand) {
			concertThis(secondCommand);
		} else {
			concertThis("Cher");
		}
		break;

	case 'spotify-this-song':
		//If user has not specified a song , use default
		// if (input === undefined || null)
		if (secondCommand) {
			spotifyThisSong(secondCommand);
		} else {
			spotifyThisSong("The Sign Ace of Base");
		}
		break;

	case 'movie-this':
		if (secondCommand) {
			movieThis(secondCommand);
		} else {
			movieThis("Mr. Nobody");
		}
		break;

	case 'do-what-it-says':
		doWhatItSays();
		break;
	default:
		break;
		console.log('Try again');
};

function spotifyThisSong(song) {
	spotify.search({ type: 'track', query: song }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		else
			for (var i = 0; i < data.tracks.items.length; i++) {

				var musicQuery = data.tracks.items[i];
				// console.log("===============================");
				// Artist(s)
				console.log("Artist" + musicQuery.artists[0].name);
				//The song's name
				console.log("name" + musicQuery.name);
				// preview link of the song from Spotify
				console.log("preview URL" + musicQuery.preview_url);
				//The album that the song is from
				console.log("Album" + musicQuery.album.name);
				console.log("-----------------");
			};
	});

};

function movieThis(movieQuery) {
	var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&apikey=e97af0fa";
	axios.get(queryUrl).then(function (results) {
		//console.log(results.data.Year);
		if (err) {
			return console.log('Error occurred: ' + err);

			//console.log(results.data.Year);
			var movieData = results.data

			console.log("Movie Title:" + movieData.Title);
			console.log("Year the movie came out:" + movieData.Year);
			console.log("IMDB Rating of the movie:" + movieData.Rating);
			console.log("Country where the movie was produced:" + movieData.Country);
			console.log("Language of the movie:" + movieData.Language);
			console.log("Plot of the movie:" + movieData.Plot);
			console.log("Actors in the movie:" + movieData.Actors);

		} else {
			console.log('Error occurred.')
		}
		if (movie === "Mr. Nobody") {
			console.log("-----------------------");
			console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
			console.log("It's on Netflix!");
		};
	});

	function concertThis(concertQuery) {
		var queryUrl = "http://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
		axios.get(queryUrl).then(function (results) {

			//console.log(results.data.Year);
			var concertData = results.data

			console.log("Name of Venue:" + concertData.Name);
			console.log("Venue location:" + concertData.Location);
			console.log("Date of the Event:" + concertData.Date);
		};

	});

};

			// 	var queryUrl = "http://www.omdbapi.com/?t" +
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
