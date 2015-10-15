"use strict";

var assert = require('assert'),
    pg = require('pg'),
    food = require('../../models/food');

var conString = 'pg://localhost:5432/virtuwaitress';
function Food() {
  this.table_name = "menu_items";
}

describe("Food Model", function() {
    var food;
    var db_cleaner;

});

  describe("instance methods", function() {

    it("can be instantiated", function() {
    assert(food instanceof Food);
    });

    it("can find all menu_items", function(done) {
      food.all(function(err, res) {
        assert.equal(err, undefined);
        assert(res instanceof Array);
        assert.equal(res.length, 5); //jaws maws claws paws gauze

        assert.equal(res[0].title, 'beer');
        assert.equal(res[1].title, 'cider');

        done();
      });
    });

    it("can find some of the menu_items", function(done) {
      food.some(2, 3, function(error, result) {
        assert.equal(error, undefined);
        assert(result instanceof Array);
        assert.equal(result.length, 2); //paws gauze

        assert.equal(result[0].title, 'Paws');
        assert.equal(result[1].title, 'Gauze');

        done();
      })
    })

    it("can find a menu_item by id", function(done){
        food.find_by("id", 1, function(err, res) {
        assert.equal(err, undefined);
        assert(res instanceof Array);
        assert.equal(res.length, 1);
        assert.equal(res[0].id, 1);
        done();
      })
    })

    it("can find a menu_item by title", function(done) {
      food.find_by("title", "Jaws", function(err, res) {
        assert.equal(err, undefined);
        assert(res instanceof Array);
        assert.equal(res.length, 1);
        assert.equal(res[0].title, 'Jaws');
        done();
      })
    })

    it("can save changes to a menu_item", function(done) {
      food.find_by("title", "Jaws", function(err, res) {
        var original_title = res[0].title;
        var id = res[0].id;
        food.save({title: "Jaws 2: Jawsier", id: id}, function(err, res) {
          assert.equal(err, undefined);
          assert.equal(res.inserted_id, 0); //it didn't insert any records
          assert.equal(res.changed, 1); //it updated one record
          done();
        })
      });
    });

    it("can save a new menu_item to the database", function(done) {
      var data = {
        title: "RoboJaws",
        overview: "Jaws is hunted by RoboJaws",
        release_date: "Tomorrow",
        inventory: 10
      }

      food.create(data, function(err, res) {
        assert.equal(res.inserted_id, 6); //it inserted a new record
        assert.equal(res.changed, 1); //one record was changed

        food.find_by("title", "RoboJaws", function(err, res) {
          assert.equal(res.length, 1);
          assert.equal(res[0].title, 'RoboJaws'); //we found our new food
          done();
        })
      })
    });
    })
