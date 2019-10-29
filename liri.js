// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Grab the axios, moment, and spotify package
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

// Code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// Able to access keys for spotify
var spotify = new Spotify(keys.spotify);

// Variable to hold the stated commands
var command = process.argv[2];

// Search variable to hold the concert, movie, song entered by the user
var entSearch = process.argv.slice(3).join(" ").trim();

// Create switch statment so when command is used the corresponding function is run
switch (command) {
    case "concert-this":
        concertThis(entSearch);
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

function concertThis() {

}

function spotifyThis() {
    if (!entSearch) {
        entSearch = "All the Small Things"
    }
    spotify.search({ type: 'track', query: entSearch, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var info = data.tracks.items[0];

        console.log("Artist: " + info.artists.name);
        console.log("Song Name: " + info.name);
        console.log("Preview: " + info.preview_url);
        console.log("Album: " + info.album.name);
        console.log("------------------------------");
    });
};

function movieThis() {
    if (!entSearch) {
        entSearch = "Mr Nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + entSearch + "&y=&plot=short&apikey=trilogy";

    axios
        .get(queryUrl)
        .then(function (response) {

            var movieInfo = response.data;
            var movieTitle = movieInfo.Title;
            var movieYear = movieInfo.Year;
            var movieIMDB = movieInfo.Ratings[0].Value;
            var movieRT = movieInfo.Ratings[1].Value;
            var movieCountry = movieInfo.Country;
            var movieLanguage = movieInfo.Language;
            var moviePlot = movieInfo.Plot;
            var movieActors = movieInfo.Actors;

            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data);
            console.log("--------------------------------------\n");
            console.log(`Title: ${movieTitle}\nYear movie was released: ${movieYear}\nIMDB Rating: ${movieIMDB}\nRotten Tomatoes Rating: ${movieRT}\nCountry: ${movieCountry}\nLanguage: ${movieLanguage}\nPlot: ${moviePlot}\nActors: ${movieActors}`);
            console.log("--------------------------------------");
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doWhat() {

}