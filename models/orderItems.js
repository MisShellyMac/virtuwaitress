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

  getOrderItem: function(id, res) {
    executeQuery(
      'SELECT * from order_items WHERE id=$1',
      [id],
      res,
      function(result) { res.status(200).json({ 'orderItem' : result.rows }); }
    );
  },

  getAllOrderItems: function(order_id, res) {
    executeQuery(
      'SELECT * from order_items WHERE order_id=$1',
      [order_id],
      res,
      function(result) { res.status(200).json({ 'orderItems' : result.rows }); }
    );
  },

  createOrderItem: function(item, res) {
    // TODO Check that order is not submitted first
    executeQuery(
      'INSERT INTO order_items (menu_item_id, order_id) ' +
      'VALUES($1, $2)',
      [item.menu_item_id, item.order_id],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  deleteOrderItem: function(id, res) {
    // TODO Check that order is not submitted first
    executeQuery(
      'DELETE FROM order_items WHERE id=$1',
      [id],
      res,
      function(result) { res.status(200).json([]); }
    );
  }

};
