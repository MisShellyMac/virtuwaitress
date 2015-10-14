"use strict";

var pg = require('pg');
var conString = 'pg://localhost:5432/virtuwaitress';
var bcrypt   = require('bcrypt-nodejs');

/*
var User = function(username)
{
  this.username = username;
};

User.prototype.
*/

module.exports = {

  findOne: function(username, callback) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          callback(err, null);
        }
        client.query('SELECT * from users where username=$1', [username],
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              callback(err, null);
            }
            if (result.rows.length == 1)
            {
              // The user was found
              callback(null, result.rows[0]);
            }
            else {
              // The user was not found
              callback(null, null);
            }
            client.end();
        });

      });
  },

  findById: function(id, callback) {
    var client = new pg.Client(conString);
    client.connect(
      function(err, client, done) {
        if (err) {
          console.error('could not connect to postgres', err);
          callback(err, null);
        }
        client.query('SELECT * from users where id=$1', [id],
          function(err, result) {
            if (err) {
              console.error('error running query', err);
              callback(err, null);
            }
            if (result.rows.length == 1)
            {
              // The user was found
              callback(null, result.rows[0]);
            }
            else {
              // The user was not found
              callback(null, null);
            }
            client.end();
        });

      });
  },

  // Turn a password into a hash
  generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  // Check if a password matches the stored hashed value
  isValidPassword: function(typedInPassword, storedPasswordHash) {
      return bcrypt.compareSync(typedInPassword, storedPasswordHash);
  }

};
