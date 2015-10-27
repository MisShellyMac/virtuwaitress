var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.CONSTRING;

console.log(conString);

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

module.exports = router;
