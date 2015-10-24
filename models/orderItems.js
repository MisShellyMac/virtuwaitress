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

  getAllOrderItems: function(userId, res) {
    executeQuery(
      'SELECT order_items.id, menu_item_id, title, price, image_url from order_items JOIN menu_items ON menu_item_id=menu_items.id JOIN orders ON orders.id=order_id WHERE user_id=$1 ORDER BY id',
      [userId],
      res,
      function(result) { res.status(200).json({ 'orderItems' : result.rows }); }
    );
  },

  createOrderItem: function(item, res) {
    // First see if there's already an order we can add to
    executeQuery(
      'SELECT id from orders WHERE user_id=$1 AND ' +
      'submitted=FALSE AND paid IS NULL',
      [item.user_id],
      res,
      function(result) {
        if (result.rows.length > 0)
        {
          // We can use this order
          executeQuery(
            'INSERT INTO order_items (menu_item_id, order_id) ' +
            'VALUES($1, $2)',
            [item.menu_item_id, result.rows[0].id],
            res,
            function(result) { res.status(200).json([]); }
          );
        }
        else {
          // If there's a submitted but unpaid order,
          // simply reject this request.
          executeQuery(
            'SELECT id from orders WHERE user_id=$1 AND ' +
            'submitted=TRUE AND paid IS NULL',
            [item.user_id],
            res,
            function(result) {
              if (result.rows.length > 0)
              {
                // There is an unpaid order!
                res.status(500).json([]);
              }
              else {
                // Create a new order and then add this to it.
                executeQuery(
                  'INSERT INTO orders (user_id, submitted) ' +
                  'VALUES($1, FALSE)',
                  [item.user_id],
                  res,
                  function(result) {
                    // Call ourselves recursively to use
                    // the order we just created
                    module.exports.createOrderItem(item, res);
                  }
                );
              }
            }
          );
        }
      }
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
