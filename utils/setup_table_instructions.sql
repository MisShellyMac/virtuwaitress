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

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/dessert.csv' WITH DELIMITER ',' CSV  ;

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/entree.csv' WITH DELIMITER ',' CSV  ;

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/appetizer.csv' WITH DELIMITER ',' CSV  ;

COPY food(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/salad.csv' WITH DELIMITER ',' CSV  ;

DROP TABLE IF EXISTS drink;
CREATE TABLE drink (
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

 COPY drink(title, price, active, vegan, vegetarian, category, gluten_free, description) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/drink.csv' WITH DELIMITER ',' CSV  ;
