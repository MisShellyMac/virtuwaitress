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
            console.log(result);
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

  getAllApprovedSocialMedia: function(res) {
    executeQuery(
      'SELECT * from approved_social_media;',
      res,
      function(result) { res.status(200).json({ 'approved_social_media' : result.rows }); }
    );
  },

  createApprovedSocialMediaItem: function(item, res) {
    executeQuery(
      'INSERT INTO approved_social_media (type, content, username, image_url) ' +
      'VALUES($1, $2, $3, $4)',
      [item.type, item.content, item.username, item.image_url],
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
