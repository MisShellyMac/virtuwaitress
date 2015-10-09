"use strict";

var pg = require('pg');
var conString = 'pg://localhost:5432/virtuwaitress';
var client = new pg.Client(conString);

module.exports = {

  getAllFood: function(res) {
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }

        client.query('SELECT * from food',
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              res.status(500).json(err);
            }
            res.status(200).json(result.rows);
            client.end();
        });

      });
  }

};
