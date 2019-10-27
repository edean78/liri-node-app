// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Grab the axios, moment, and spotify package
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

// Code required to import the keys.js file and store it in a variable
var keys = require("./keys.js/index.js");

// Able to access keys for spotify
var spotify = new Spotify(keys.spotify);

// Variable to hold the stated commands
var command = process.argv[2];

// Search variable to hold the concert, movie, song entered by the user
var entSearch = process.argv.slice(3).join(" ");

// Create switch statment so when command is used the corresponding function is run
switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhat();
        break;
}

// function concertThis(){

// }

function spotifyThis(){
    if (!entSearch){
        entSearch = "All the Small Things"
    }
    spotify.search({ type: 'track', query: entSearch }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   var response = JSON.stringify(data, null, 2); 
      console.log(JSON.stringify(data, null, 2)); 
      });
};

// function movieThis(){

// }

// function doWhat(){

// }