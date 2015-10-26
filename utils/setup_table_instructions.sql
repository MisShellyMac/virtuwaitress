CREATE DATABASE virtuwaitress;
DROP TABLE IF EXISTS menu_items;
CREATE TABLE menu_items (
     id               serial PRIMARY KEY,
     title            text,
     price            decimal,
     active           boolean,
     vegan            boolean,
     vegetarian       boolean,
     category         text,
     gluten_free      boolean,
     description      text,
     image_url        text,
     total_ratings    int NOT NULL,
     avg_rating       decimal NOT NULL
 );

COPY menu_items(title, price, active, vegan, vegetarian, category, gluten_free, description, image_url, total_ratings, avg_rating) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/dessert.csv' WITH DELIMITER ',' CSV  ;

COPY menu_items(title, price, active, vegan, vegetarian, category, gluten_free, description, image_url, total_ratings, avg_rating) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/entree.csv' WITH DELIMITER ',' CSV  ;

COPY menu_items(title, price, active, vegan, vegetarian, category, gluten_free, description, image_url, total_ratings, avg_rating) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/appetizer.csv' WITH DELIMITER ',' CSV  ;

COPY menu_items(title, price, active, vegan, vegetarian, category, gluten_free, description, image_url, total_ratings, avg_rating) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/salad.csv' WITH DELIMITER ',' CSV  ;

 COPY menu_items(title, price, active, vegan, vegetarian, category, gluten_free, description, image_url, total_ratings, avg_rating) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/drink.csv' WITH DELIMITER ',' CSV  ;

 DROP TABLE IF EXISTS users;
 CREATE TABLE users (
      id               serial PRIMARY KEY,
      username         text,
      password         text,
      isAdmin          boolean NOT NULL
  );

  COPY users(username, password, isAdmin) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/users.csv' WITH DELIMITER ',' CSV ;

  DROP TABLE IF EXISTS orders;
  CREATE TABLE orders (
       id               serial PRIMARY KEY,
       user_id          int NOT NULL,
       submitted        boolean NOT NULL,
       paid             timestamp
   );

   DROP TABLE IF EXISTS order_items;
   CREATE TABLE order_items (
        id               serial PRIMARY KEY,
        menu_item_id     int NOT NULL,
        order_id         int NOT NULL
    );

  DROP TABLE IF EXISTS approved_social_media;
  CREATE TABLE approved_social_media (
       id               serial PRIMARY KEY,
       type             text NOT NULL,
       content          text,
       username         text NOT NULL,
       image_url        text
   );

  COPY approved_social_media(type, content, username, image_url) FROM '/Users/MisShellyMac/ada/virtuwaitress/utils/approvedSocialMedia.csv' WITH DELIMITER ',' CSV  ;
