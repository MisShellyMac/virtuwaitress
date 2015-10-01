var express = require('express');
var router = express.Router();
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('cats.db');
var pg = require('pg');
var conString = 'postgress://localhost/testdb';

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    // client.end();
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  client.query('SELECT * FROM weather', function(err, rows){
  res.render('index', { title: rows['rows'][0]['city'] });
  });
});



module.exports = router;
