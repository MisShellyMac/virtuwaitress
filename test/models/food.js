"use strict";

var assert = require('assert'),
    pg = require('pg'),
    Food = require('../../models/food');

describe("Food Model Methods", function(){
  it("can do something", function(done){
    var food = Food.getAllFood();
    console.log(food);
    done();
    });
  });
