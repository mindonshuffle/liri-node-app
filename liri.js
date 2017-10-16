// --- --- --- GLOBAL VARIABLES / REQUIRES --- --- ---

var keys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs");

//console.log(keys)

// initialize Twitter API w/ keys from keys.js
var client = new twitter(keys.twitterKeys);

var params = {screen_name: 'scofotemp'};

// initialize Spotify API w/ keys

var spotify = new Spotify(keys.spotifyKeys);

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

		    	fs.appendFile('log.txt', '\n'+ tweets[i].created_at+': '+tweets[i].text,'utf8', function(err){
					if(err){
						console.log('Error!');
					}
				});

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
			fs.appendFile('log.txt', '\n'+'Title: ' +JSON.parse(body).Title ,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
			console.log('Released: ' +JSON.parse(body).Year);
			fs.appendFile('log.txt', '\n'+'Released: ' +JSON.parse(body).Year ,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
			console.log('IMDB Rating: ' +JSON.parse(body).imdbRating);
			fs.appendFile('log.txt', '\n'+ 'IMDB Rating: ' +JSON.parse(body).imdbRating,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
			console.log('Rotten Tomatoes Rating: ' +JSON.parse(body).Ratings[1].Value +' Fresh');
			fs.appendFile('log.txt', '\n'+'Rotten Tomatoes Rating: ' +JSON.parse(body).Ratings[1].Value +' Fresh' ,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
			console.log('Produced in: ' +JSON.parse(body).Country);
			fs.appendFile('log.txt', '\n'+ 'Produced in: ' +JSON.parse(body).Country,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
			console.log('Language(s): ' +JSON.parse(body).Language);
			fs.appendFile('log.txt', '\n'+ 'Language(s): ' +JSON.parse(body).Language,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
			console.log('Summary: ' +JSON.parse(body).Plot);
			fs.appendFile('log.txt', '\n'+ 'Summary: ' +JSON.parse(body).Plot,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
			console.log('Starring: ' +JSON.parse(body).Actors);
			fs.appendFile('log.txt', '\n'+ 'Starring: ' +JSON.parse(body).Actors,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
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
		userInput = "The Sign Ace of Base";
	}

	//console.log('Spotify: '+userInput);

	//make request to Spotify

	spotify.search({ type: 'track', query: userInput }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    //log full data object
	    //console.log(JSON.stringify(data.tracks.items[0], null, 2));

		//print appropriate responses

		console.log('\nSpotify results for: ' + userInput +':\n');
		fs.appendFile('log.txt','\nSpotify results for: ' + userInput +':','utf8', function(err){
			if(err){
				console.log('Error!');
			}
		});

		//Artist(s)
		for( var i = 0; i < data.tracks.items[0].artists.length; i++ ){
			console.log('Artist: ' +data.tracks.items[0].artists[i].name +' '); 
			fs.appendFile('log.txt', '\n'+'Artist: ' +data.tracks.items[0].artists[i].name +' ' ,'utf8', function(err){
				if(err){
					console.log('Error!');
				}
			});
		}

	 	//The song's name
	    console.log('Song: ' +data.tracks.items[0].name);
	    fs.appendFile('log.txt', '\n'+'Song: ' +data.tracks.items[0].name ,'utf8', function(err){
			if(err){
				console.log('Error!');
			}
		}); 

	    //The album that the song is from
	    console.log('Album: ' +data.tracks.items[0].album.name)
		fs.appendFile('log.txt', '\n'+'Album: ' +data.tracks.items[0].album.name ,'utf8', function(err){
			if(err){
				console.log('Error!');
			}
		});

	    //A preview link of the song from Spotify
	    console.log('Preview: ' +data.tracks.items[0].preview_url);
		fs.appendFile('log.txt', '\n'+'Preview: ' +data.tracks.items[0].preview_url ,'utf8', function(err){
			if(err){
				console.log('Error!');
			}
		});	    

   	});

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

		fs.appendFile('log.txt', '\n' +liriMode +' ' +userInput,'utf8', function(err){
			if(err){
				console.log('Error!');
			}
		});

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

		default:

			console.log('Please enter an valid argument:');
			console.log('  movie-this');
			console.log('  my-tweets');
			console.log('  spotify-this-song');
			console.log('  do-what-it-says');
			break;
	}
};

// --- --- --- MAIN LOGIC --- --- ---

fs.appendFile('log.txt', '\n\n------------------------------------------------\n\n'+liriMode +' ' +userInput +'\n','utf8', function(err){
	if(err){
		console.log('Error!');
	}
});

runCommand();