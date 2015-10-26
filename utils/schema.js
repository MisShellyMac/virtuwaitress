"use strict";

var pg = require('pg');
var fs = require('fs');
fs.readFile('./utils/setup_table_instructions.sql', 'utf-8', function(err, data){
  var connectionString = 'aa1lfz8zz0126ov.cwhoqkhia5qf.us-west-2.rds.amazonaws.com:5432';
  var client = new pg.Client(connectionString);
  client.connect (function(err) {
   client.query(data,function(err, result){
     if (err) {
       console.log("ERROR: " + err);
     }
     else {
       console.log("SUCCESS: " + result);
     }
     client.end();
   });
  });
});
