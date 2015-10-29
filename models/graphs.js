"use strict";

var pg = require('pg');
var conString = process.env.CONSTRING;

var plotly = require('plotly')(process.env.PLOTLY_USER, process.env.PLOTLY_KEY);

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

  getMenuItemsByNumOrders: function(res) {
    executeQuery(
      'SELECT title, count(menu_item_id) FROM order_items JOIN menu_items ON menu_item_id=menu_items.id GROUP BY title ORDER BY count DESC',
      [],
      res,
      function(result)
      {
        var x = [];
        var y = [];
        for (var i = 0; i < result.rows.length; i++)
        {
          var limit = 20;
          var title = result.rows[i].title;
          if (title.length <= limit)
            x.push(title);
          else
            x.push(title.substring(0, limit) + "...");
          y.push(result.rows[i].count);
        }
        var data = [
          {
            x: x,
            y: y,
            type: "bar"
          }
        ];
        var graphOptions = {filename: "getMenuItemsByNumOrders", fileopt: "overwrite"};
        plotly.plot(data, graphOptions, function (err, result) {
          if (err != null)
          {
            res.status(500).json(err);
          }
          else
          {
            res.status(200).json(result);
          }
        });
      }
    );
  },

  getMenuItemsByRatings: function(res) {
    executeQuery(
      'SELECT title, avg_rating FROM menu_items ORDER BY avg_rating DESC',
      [],
      res,
      function(result)
      {
        var x = [];
        var y = [];
        for (var i = 0; i < result.rows.length; i++)
        {
          var limit = 20;
          var title = result.rows[i].title;
          if (title.length <= limit)
            x.push(title);
          else
            x.push(title.substring(0, limit) + "...");
          y.push(result.rows[i].avg_rating);
        }
        var data = [
          {
            x: x,
            y: y,
            type: "bar"
          }
        ];
        var graphOptions = {filename: "getMenuItemsByRatings", fileopt: "overwrite"};
        plotly.plot(data, graphOptions, function (err, result) {
          if (err != null)
          {
            res.status(500).json(err);
          }
          else
          {
            res.status(200).json(result);
          }
        });
      }
    );
  }

};
