"use strict";

var pg = require('pg');
var conString = 'pg://localhost:5432/virtuwaitress';

module.exports = {

  getAllFood: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from menu_items',
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              res.status(500).json(err);
            }
            res.status(200).json({ 'foods' : result.rows });
            client.end();
        });
      });
  },

  getAllGFFood: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from menu_items where gluten_free = true',
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

  getAllVeganFood: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from menu_items where vegan = true',
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

  getAllVegetarianFood: function(res) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query('SELECT * from menu_items where vegetarian = true',
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
