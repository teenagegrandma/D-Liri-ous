var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var tweetsArray = [];
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = "Earth Girls Are Easy";
var defaultSong = "Zombie";

var twitterKeys = keys.twitterKeys;
var tmdbKey = keys.tmdbKey;