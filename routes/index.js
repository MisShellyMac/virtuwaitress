var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = 'pg://localhost:5432/virtuwaitress';

var client = new pg.Client(conString);
client.connect(
  function(err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err);
    }

    client.query('SELECT NOW() AS "theTime"',
      function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        console.log("CONNECTED: " + result.rows[0].theTime);
        client.end();
    });
  });


  var env = require('node-env-file');
  env(__dirname + "/../secret.env");

  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
  });
//this will return the result of tweets with mentions to @business
  client.get('search/tweets', {q: '@cohortcafe'}, function(error, tweets, response){
     console.log(tweets);
  });
// this will return results searching for the hashtag of the business
  client.get('search/tweets', {q: '#cohortcafe'}, function(error, tweets, response){
     console.log(tweets);
  });

  var ig = require('instagram-node').instagram();


  ig.use({ access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
  ig.use({ client_id: process.env.INSTAGRAM_CLIENT_ID,
           client_secret: process.env.INSTAGRAM_CLIENT_SECRET });

// there is no current api endpoint for @mentions for instagram. It would be up to the individual businesses/users to possibly repost grams that they were mentioned in so that it would then be visible to api call in future as a post by the business/user.

  ig.tag_media_recent('cohortcafe', function(err, medias, pagination, remaining, limit) {
   console.log(medias);
    for (var i = 0; i < medias.length; i++)
    {
      var gram = medias[i];
      console.log(gram.user.username + ": " + gram.caption.text);
      console.log(gram.user.profile_picture);
    }
  });

module.exports = router;
