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

  getMenuItem: function(id, res) {
    executeQuery(
      'SELECT * from menu_items WHERE id=$1', 
      [id], 
      res,
      function(result) { res.status(200).json({ 'food' : result.rows }); }
    );
  },

  getAllMenuItems: function(res) {
    executeQuery(
      'SELECT * from menu_items ORDER BY category, title', 
      [], 
      res,
      function(result) { res.status(200).json({ 'foods' : result.rows }); }
    );
  },

  updateMenuItem: function(id, item, res) {
    executeQuery(
      'UPDATE menu_items SET title=$1, price=$2, active=$3, ' +
      'vegan=$4, vegetarian=$5, category=$6, gluten_free=$7, ' +
      'description=$8, image_url=$9 ' +
      'WHERE id=$10', 
      [item.title, item.price, item.active, item.vegan, item.vegetarian,
       item.category, item.gluten_free, item.description, item.image_url,
       id],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  createMenuItem: function(item, res) {
    
    if (item.price == null)
      item.price = 0;
    if (item.category == null)
      item.category = "Entree";
    
    item.avg_rating = 0;
    item.total_ratings = 0;

    executeQuery(
      'INSERT INTO menu_items (title, price, active, vegan, vegetarian, ' +
      'category, gluten_free, description, image_url, total_ratings, avg_rating) ' +
      'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', 
      [item.title, item.price, item.active, item.vegan, item.vegetarian,
       item.category, item.gluten_free, item.description, item.image_url,
       item.total_ratings, item.avg_rating],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  deleteMenuItem: function(id, res) {
    executeQuery(
      'DELETE FROM menu_items WHERE id=$1', 
      [id],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  rateMenuItem: function(id, rating, res) {
    executeQuery(
      'SELECT * from menu_items WHERE id=$1', 
      [id],
      res,
      function(result) {
        var total = result.rows[0].total_ratings;
        var avg = result.rows[0].avg_rating;

        var totalStars = avg * total;
        
        // Increment the total # of ratings
        total = total + 1;

        // Calculate a new average
        avg = (totalStars + rating) / total;

        // Update the database
        executeQuery(
          'UPDATE menu_items SET total_ratings=$1, avg_rating=$2 ' +
          'WHERE id=$3', 
          [total, avg, id],
          res,
          function(result) { res.status(200).json([]); }
        );        
      }
    );
  }
  
};
