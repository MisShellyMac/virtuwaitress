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

  getApprovedSocialMedia: function(id, res) {
    executeQuery(
      'SELECT * from approved_social_media WHERE id=$1',
      [id],
      res,
      function(result) { res.status(200).json({ 'approved_social_media' : result.rows }); }
    );
  },

  getAllApprovedSocialMedia: function(order_id, res) {
    executeQuery(
      'SELECT * from approved_social_media;',
      [approved_social_media.id],
      res,
      function(result) { res.status(200).json({ 'approved_social_media' : result.rows }); }
    );
  },

  createApprovedSocialMedia: function(item, res) {
    // TODO Check that order is not submitted first
    executeQuery(
      'INSERT INTO approved_social_media (media.id, media.type, media.content, media.username, media.image_url) ' +
      'VALUES($1, $2, $3, $4, $5)',
      [approved_social_media.id, approved_social_media.type, approved_social_media.content, approved_social_media.username, approved_social_media.image_url],
      res,
      function(result) { res.status(200).json([]); }
    );
  },

  deleteApprovedSocialMediaItem: function(id, res) {
    // TODO Check that order is not submitted first
    executeQuery(
      'DELETE FROM approved_social_media WHERE id=$1',
      [id],
      res,
      function(result) { res.status(200).json([]); }
    );
  }
};
