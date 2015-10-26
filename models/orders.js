"use strict";

var pg = require('pg');
var conString = 'aa1lfz8zz0126ov.cwhoqkhia5qf.us-west-2.rds.amazonaws.com:5432';

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

  getAllActiveOrders: function(res) {
    executeQuery(
      'SELECT submitted, username, menu_items.title, menu_items.price ' +
      ' from orders ' +
      ' JOIN users ON user_id=users.id ' +
      ' JOIN order_items ON order_id=orders.id ' +
      ' JOIN menu_items ON menu_item_id=menu_items.id ' +
      ' WHERE paid IS NULL ORDER BY orders.id DESC',
      [],
      res,
      function(result) { res.status(200).json({ 'orders' : result.rows }); }
    );
  },

  getAllPaidOrders: function(res) {
    executeQuery(
      'SELECT orders.id, paid, username, menu_items.title, menu_items.price ' +
      ' from orders ' +
      ' JOIN users ON user_id=users.id ' +
      ' JOIN order_items ON order_id=orders.id ' +
      ' JOIN menu_items ON menu_item_id=menu_items.id ' +
      ' WHERE paid IS NOT NULL ORDER BY paid DESC',
      [],
      res,
      function(result) { res.status(200).json({ 'orderItems' : result.rows }); }
    );
  },

  createOrder: function(userId, res) {
    executeQuery(
      'INSERT INTO orders (user_id, submitted) ' +
      'VALUES($1, FALSE)',
      [userId],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  submit: function(userId, res) {
    executeQuery(
      'UPDATE orders SET submitted=TRUE WHERE user_id=$1',
      [userId],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  pay: function(userId) {
    executeQuery(
      'UPDATE orders SET paid=current_timestamp WHERE user_id=$1 AND paid IS NULL',
      [userId],
      null,
      function(result) { }
    );
  },

  getOrderStatus: function(userId, res) {
    executeQuery(
      'SELECT * from orders WHERE user_id=$1 AND (submitted=FALSE OR paid IS NULL)',
      [userId],
      res,
      function(result)
      {
        var status = "inactive";
        if (result.rows.length > 0)
        {
          var order = result.rows[0];
          if (order.submitted == false) {
            status = "unsubmitted"
          }
          else {
            status = "submitted";
          }
        }
        res.status(200).json(status);
      }
    );
  }

};
