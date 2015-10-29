"use strict";

var pg = require('pg');

var conString = process.env.CONSTRING;

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
            // console.log(result);
            callback(result);
        });
      });
}
module.exports = {

  getAllApprovedSocialMediaDirectly: function(callback) {
    executeQuery(
      'SELECT * from approved_social_media',
      [],
      null,
      function(result) { callback(result.rows); }
    );
  },

  getAllApprovedSocialMedia: function(res) {
    executeQuery(
      'SELECT * from approved_social_media;',
      [],
      res,
      function(result) { res.status(200).json({ 'approved_social_media' : result.rows }); }
    );
  },

  createApprovedSocialMediaItem: function(item, res) {
    executeQuery(
      'INSERT INTO approved_social_media (type, username, content, image_url) ' +
      'VALUES($1, $2, $3, $4)',
      [item.type, item.username, item.content, item.image_url_https],
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
