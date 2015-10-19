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

  client.get('search/tweets', {q: '@cohortcafe'}, function(error, tweets, response){
     console.log(tweets);
  });

  client.get('search/tweets', {q: '#cohortcafe'}, function(error, tweets, response){
     console.log(tweets);
  });

module.exports = router;
