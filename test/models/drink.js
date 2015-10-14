var assert = require('assert'),
    Drink = require('../../models/drink'),
    pg = require('pg');

describe("Drink", function() {
    var drink, db_cleaner

    beforeEach(function(done) {
      drink = new Drink();

      db_cleaner = new pg.Database('db/test.db');
      db_cleaner.serialize(function() {
        db_cleaner.exec(
          "BEGIN; \
          DELETE FROM drink; \
          INSERT INTO drink(title, price, active, vegan, vegetarian, category, gluten_free, description) \
          VALUES('beer', 6, TRUE, FALSE, TRUE, 'Dessert', FALSE, 'hops and ale yumminess'), \
                ('cider', 6, TRUE, FALSE, TRUE, 'Dessert', FALSE, 'apple cider'), \
                ('cosmo', 6, TRUE, FALSE, TRUE, 'Dessert', FALSE, 'Fruity and sweet'),\
                ('vodka soda', 6, TRUE, FALSE, TRUE, 'Dessert', FALSE, 'with lime'), \
                ('choc martini', 6, TRUE, FALSE, TRUE, 'Dessert', FALSE, 'Chocolate yumminess'); \
          COMMIT;"
          , function(err) {
            db_cleaner.close();
            done();
        }
      );
      })
    });
});

  it("can be instantiated", function() {
    assert(drink instanceof Drink);
  })

  describe("instance methods", function() {
    it("can find all drinks", function(done) {
      drink.all(function(err, res) {
        assert.equal(err, undefined);
        assert(res instanceof Array);
        assert.equal(res.length, 5); //jaws maws claws paws gauze

        assert.equal(res[0].title, 'beer');
        assert.equal(res[1].title, 'cider');

        done();
      })
    });

    it("can find some of the drinks", function(done) {
      drink.some(2, 3, function(error, result) {
        assert.equal(error, undefined);
        assert(result instanceof Array);
        assert.equal(result.length, 2); //paws gauze

        assert.equal(result[0].title, 'Paws');
        assert.equal(result[1].title, 'Gauze');

        done();
      })
    })

    it("can find a drink by id", function(done){
      drink.find_by("id", 1, function(err, res) {
        assert.equal(err, undefined);
        assert(res instanceof Array);
        assert.equal(res.length, 1);
        assert.equal(res[0].id, 1);
        done();
      })
    })

    it("can find a drink by title", function(done) {
      drink.find_by("title", "Jaws", function(err, res) {
        assert.equal(err, undefined);
        assert(res instanceof Array);
        assert.equal(res.length, 1);
        assert.equal(res[0].title, 'Jaws');
        done();
      })
    })

    it("can save changes to a drink", function(done) {
      drink.find_by("title", "Jaws", function(err, res) {
        var original_title = res[0].title;
        var id = res[0].id;
        drink.save({title: "Jaws 2: Jawsier", id: id}, function(err, res) {
          assert.equal(err, undefined);
          assert.equal(res.inserted_id, 0); //it didn't insert any records
          assert.equal(res.changed, 1); //it updated one record
          done();
        })
      })
    });

    it("can save a new drink to the database", function(done) {
      var data = {
        title: "RoboJaws",
        overview: "Jaws is hunted by RoboJaws",
        release_date: "Tomorrow",
        inventory: 10
      }

      drink.create(data, function(err, res) {
        assert.equal(res.inserted_id, 6); //it inserted a new record
        assert.equal(res.changed, 1); //one record was changed

        drink.find_by("title", "RoboJaws", function(err, res) {
          assert.equal(res.length, 1);
          assert.equal(res[0].title, 'RoboJaws'); //we found our new drink
          done();
        })
      })
    });
    })
