var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE food(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
