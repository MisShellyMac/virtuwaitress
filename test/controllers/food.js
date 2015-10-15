"use strict";

var assert = require('assert'),
    pg = require('pg'),
    Food = require('../../controllers/food');

describe("Food Controller Methods", function(){

  it("can do something", function(done){
    var food = Food.getAllFood();
    console.log(food);
    done();
  });
});
