// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Grab the axios, moment, and spotify package
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

// Code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// Includes the FS package for reading and writing packages
var fs = require("fs");

// Able to access keys for spotify
var spotify = new Spotify(keys.spotify);

// Variable to hold the stated commands
var command = process.argv[2];

// Search variable to hold the concert, movie, song entered by the user
var entSearch = process.argv.slice(3).join(" ").trim();

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

function concertThis() {
    if (!entSearch) {
        entSearch = "Chris Stapleton"
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + entSearch + "/events?app_id=codingbootcamp";

    axios
        .get(queryUrl)
        .then(function (response) {

            var concertInfo = response.data;

            // If the axios was successful...
            for (var i = 0; i < concertInfo.length; i++) {
                var venueName = concertInfo[i].venue.name;
                var venueLocation = concertInfo[i].venue.region;
                var dateEvent = concertInfo[i].datetime;
                var eventDate = moment(dateEvent).format("MM/DD/YYYY");

                console.log("----------------------------");
                console.log(`Name of Venue: ${venueName}\nVenue Location: ${venueLocation}\nDate of the Event: ${eventDate}`);
                console.log("----------------------------");
            }

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

function spotifyThis() {
    if (!entSearch) {
        entSearch = "Whiskey Glasses"
    }
    spotify.search({ type: 'track', query: entSearch, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songInfo = data.tracks.items;

        for (var i = 0; i < songInfo.length; i++) {
            var songArtist = songInfo[i].artists.name;
            var songName = songInfo[i].name;
            var songPreview = songInfo[i].preview_url;
            var songAlbum = songInfo[i].album.name;

            console.log("-----------------------------------");
            console.log(`Artist: ${songArtist}\nSong Name: ${songName}\nPreview: ${songPreview}\nAlbum: ${songAlbum}`);
            console.log("-----------------------------------");

        }
    });
};

function movieThis() {
    if (!entSearch) {
        entSearch = "Tombstone"
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
            // Then log the movie information
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
    // read the random.txt file to get data information and run 
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");
        command = output[0];
        entSearch = output[1];

        if (command === "concert-this"){
            concertThis();
        } else if (command === "movie-this"){
            movieThis();
        } else {
           spotifyThis(); 
        }
      });

}