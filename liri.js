require("dotenv").config();
let keys = require("./keys.js");
//  let inquirer = require("inquirer");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let axios = require("axios");
let omdbKey = keys.omdb.api_key;
let moment = require('moment');
// let request = require('request');;
// let dotenv = require("dotenv").config();
// console.log(keys);
var command = process.argv[2];
var secondCommand = process.argv[3];
//console.log(commandParam);
//concatenate multiple words in 2nd user argument
for (var i = 4; i < process.argv.length; i++) {
	secondCommand += '+' + process.argv[i];
}

switch (command) {

	case 'concert-this':
		if (secondCommand) {
			concertThis(secondCommand);
		} else {
			concertThis("Radioactive");
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
	axios.get(queryUrl).then(function (response) {
		//console.log(results.data.Year);


			//console.log(results.data.Year);
			var movieData = response.data

			console.log("Movie Title:" + movieData.Title);
			console.log("Year the movie came out:" + movieData.Year);
			console.log("IMDB Rating of the movie:" + movieData.Rating);
			console.log("Country where the movie was produced:" + movieData.Country);
			console.log("Language of the movie:" + movieData.Language);
			console.log("Plot of the movie:" + movieData.Plot);
			console.log("Actors in the movie:" + movieData.Actors);

		// } else {
		// 	console.log('Error occurred.')

		if (movieQuery === "Mr. Nobody") {
			console.log("-----------------------");
			console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
			console.log("It's on Netflix!");
		};

	});
};


	function concertThis(concertQuery) {
		var queryUrl = "http://rest.bandsintown.com/artists/" + concertQuery + "/events?app_id=codingbootcamp";
		//console.log(queryUrl);

		axios.get(queryUrl).then(function (response) {
		 // console.log();

			var concertData = response.data[0]
			var momentData = moment(concertData.Date).format('MM/DD/YYYY')

		//console.log(concertData)

	    console.log("Name of Venue:" + concertData.venue.name);
	  	console.log("Venue location:" + concertData.venue.country);
	  	console.log("Date of the Event:" + concertData.datetime);

		 });
	};

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
