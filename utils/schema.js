"use strict";

var pg = require('pg');
var fs = require('fs');

console.log("Reading setup_table_instructions.sql...");
fs.readFile('./utils/setup_table_instructions.sql', 'utf-8', function(err, data) {
  if (err != null)
  {
    console.log("ERROR READING FILE: " + err);
    return;
  }

  var conString = process.env.CONSTRING;

  var client = new pg.Client(conString);
  console.log("Connecting to database...");
  client.connect (function(err) {
    if (err != null)
    {
      console.log("ERROR CONNECTING: " + err);
      return;
    }

   client.query(data, function(err, result){
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
