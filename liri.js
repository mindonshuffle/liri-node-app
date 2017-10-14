var keys = require("./keys.js");
var twitter = require("twitter");

//console.log(keys)

// initialize Twitter API w/ keys from keys.js
var client = new twitter(keys);

var params = {screen_name: 'scofotemp'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(JSON.stringify(tweets, null, 2));

    for (var i = 0; i < tweets.length; i++){
    	console.log(tweets[i].text);
    }
  }
});