// --- --- --- GLOBAL VARIABLES / REQUIRES --- --- ---

var keys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
var fs = require("fs");

//console.log(keys)

// initialize Twitter API w/ keys from keys.js
var client = new twitter(keys);

var params = {screen_name: 'scofotemp'};

// initialize Spotify API w/ keys



//sets LIRI's function mode
var liriMode = process.argv[2];

//sets additional user input to a variable
var userInput = process.argv[3];


// --- --- --- FUNCTION DECLARATIONS --- --- ---

function myTweets(){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
		    // console.log(JSON.stringify(tweets, null, 2));

		    for (var i = 0; i < tweets.length && i < 20; i++){
		    	// console.log('"'+tweets[i].text+'" was tweeted ' +tweets[i].created_at);
		    	console.log(tweets[i].created_at+': '+tweets[i].text);
		    }
		}
	});
};

//make request to OMDB and print appropriate responses
function movieThis(userInput){

	//set default is no user input
	if( userInput === undefined ){
		userInput = 'Mr. Nobody';
	};

	//make request using userInput for title
	request("http://www.omdbapi.com/?t=" +userInput +"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		//if response is valid:
		if( JSON.parse(body).Title != undefined ){

			// console.log(JSON.parse(body, null, 2));
			console.log('Title: ' +JSON.parse(body).Title);
			console.log('Released: ' +JSON.parse(body).Year);
			console.log('IMDB Rating: ' +JSON.parse(body).imdbRating);
			console.log('Rotten Tomatoes Rating: ' +JSON.parse(body).Ratings[1].Value +' Fresh');
			console.log('Produced in: ' +JSON.parse(body).Country);
			console.log('Language(s): ' +JSON.parse(body).Language);
			console.log('Summary: ' +JSON.parse(body).Plot);
			console.log('Starring: ' +JSON.parse(body).Actors);
		}
		else{
			console.log('No OMDB Results found for "'+userInput +'"');
		};
	});

};

//retrieve and print spotify info
function spotifyThisSong(userInput){

	//set default if no input from user
	if( userInput === undefined ){
		userInput = "The Sign"
	}

	console.log('Spotify: '+userInput);

	//make request to Spotify

	//print appropriate responses
	//Artist(s)
     
 	//The song's name
     
    //A preview link of the song from Spotify
     
    //The album that the song is from

};


function doWhatItSays(){

	fs.readFile("random.txt", "utf8", function(error, data) {

		// If the code experiences any errors it will log the error to the console.
		if (error) {
			return console.log(error);
		}

		// split the data into an array at comma
		var dataArray = data.split(",");

		//set liriMode to first element in dataArray
		liriMode = dataArray[0];

		//set userInput to second element in dataArray
		userInput = dataArray[1];

		runCommand();

	});

};


function runCommand(){

	switch( liriMode ){

		case 'my-tweets': 
			
			myTweets();
			break;

		case 'movie-this':

			movieThis(userInput);
			break;

		case 'spotify-this-song':

			spotifyThisSong(userInput);
			break;

		case 'do-what-it-says':

			doWhatItSays();
			break;

		case undefined:

			console.log('Please enter an argument.');
			break;
	}
};

// --- --- --- MAIN LOGIC --- --- ---

runCommand();