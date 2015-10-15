"use strict";

var pg = require('pg');
var conString = 'pg://localhost:5432/virtuwaitress';
/*
function Drink() {
  this.table_name = "drink";
}
*/

module.exports = {

  getAllDrink: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from drink',
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              res.status(500).json(err);
            }
            res.status(200).json({ "drinks" : result.rows });
            client.end();
        });

      });
  },

  getAllGFDrink: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from drink where gluten_free = true',
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              res.status(500).json(err);
            }
            res.status(200).json(result.rows);
            client.end();
        });
      });
  },

  getAllVeganDrink: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from drink where vegan = true',
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              res.status(500).json(err);
            }
            res.status(200).json(result.rows);
            client.end();
        });
      });
  },

  getAllVegetarianDrink: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from drink where vegetarian = true',
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              res.status(500).json(err);
            }
            res.status(200).json(result.rows);
            client.end();
        });
      });
  },

};

//module.exports = Drink
