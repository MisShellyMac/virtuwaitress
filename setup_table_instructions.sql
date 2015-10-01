CREATE TABLE weather (
     id SERIAL PRIMARY KEY,
     city            varchar(80),
     temp_lo         int,           -- low temperature
     temp_hi         int,           -- high temperature
     prcp            real,          -- precipitation
     date            date,
     UNIQUE(city, date)
 );

COPY weather(city, temp_lo, temp_hi, prcp, date) FROM '/Users/MisShellyMac/ada/virtuwaitress/weather.txt' WITH DELIMITER ',' ;
