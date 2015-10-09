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

    /* GET home page. */
    router.get('/', function(req, res, next) {
      /*
      client.query('SELECT * from food',
        function(err, result) {
          res.status(200).json(result.rows);
        });
      */
      res.status(200).json([]);
    });

  });

module.exports = router;
