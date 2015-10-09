"use strict";

var pg = require('pg')
    db_env = process.env.DB || 'development',
    db = new pg.Database('db/' + db_env + '.db');

var food = require('./desserts');
