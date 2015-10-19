"use strict";

var pg = require('pg');
var conString = 'pg://localhost:5432/virtuwaitress';

function executeQuery(query, params, res, callback)
{
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          res.status(500).json(err);
        }
        client.query(query, params,
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              res.status(500).json(err);
            }
            client.end();
            callback(result);
        });
      });
}

module.exports = {

  getOrder: function(id, res) {
    executeQuery(
      'SELECT * from orders WHERE id=$1',
      [id],
      res,
      function(result) { res.status(200).json({ 'order' : result.rows }); }
    );
  },

  getAllOrders: function(res) {
    executeQuery(
      'SELECT * from orders ORDER BY date DESC',
      [],
      res,
      function(result) { res.status(200).json({ 'orders' : result.rows }); }
    );
  },

  createOrder: function(user_id, res) {
    executeQuery(
      'INSERT INTO orders (user_id, submitted) ' +
      'VALUES($1, FALSE)',
      [user_id],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  submit: function(id, res) {
    executeQuery(
      'UPDATE orders SET submitted=TRUE WHERE id=$1',
      [id],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  pay: function(id, res) {
    executeQuery(
      'UPDATE orders SET paid=NOW() WHERE id=$1',
      [id],
      res,
      function(result) { res.status(200).json([]); }
    );
  }

};
