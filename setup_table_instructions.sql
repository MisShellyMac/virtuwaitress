DROP TABLE IF EXISTS food;
CREATE TABLE food (
     id               serial PRIMARY KEY,
     title            text,
     price            int,
     active           boolean,
     vegan            boolean,
     vegetarian       boolean,
     category         text,
     gluten_free      boolean,
     description      text
 );

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/dessert.csv' WITH DELIMITER ',' CSV  ;

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/entree.csv' WITH DELIMITER ',' CSV  ;

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/appetizer.csv' WITH DELIMITER ',' CSV  ;

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/salad.csv' WITH DELIMITER ',' CSV  ;
