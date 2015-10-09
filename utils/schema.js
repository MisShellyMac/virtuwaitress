"use strict";

var pg = require('pg');
var fs = require('fs');
fs.readFile('./utils/setup_table_instructions.sql', 'utf-8', function(err, data){
  var connectionString = "pg://localhost:5432/virtuwaitress"
  var client = new pg.Client(connectionString);
  client.connect (function(err) {
   client.query(data,function(err, result){
    //  console.log(result);
     client.end();
   });
  });
});
