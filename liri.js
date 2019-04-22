var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var dotenv  = require("dotenv").config();


//moment js
var moment = require('moment');
moment().format();

//spotify keys
var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;

//variable for input
var command = process.argv[2];
var input = process.argv[3];
//This function processes the input commands
function processCommands(command, commandParam){

	//console.log(commandParam);

	switch(command){
    case 'spotify-this-song':
		//If user has not specified a song , use default
		if(commandParam === undefined){
			commandParam = defaultSong;
		}
    spotifyThis(commandParam); break;

    default:
		console.log("Invalid command. Please type any of the following commnds: spotify-this-song");
}
//Do what it says reads text from random.txt file, command is ran
var doWhatItSays = function() {
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
