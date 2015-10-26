"use strict";

var assert = require('assert');
var request = require('supertest');
var baseUrl = "http://localhost:3000"

describe("Menu Item APIs", function() {
  it("should get all menu items", function(done) {
    request(baseUrl)
      .get('/foods')
      .expect('Content-Type', /json/)
      .expect(200) // Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        var items = res.body.foods;
        for (var i = 0; i < items.length; i++)
        {
          throw "TODO: Validate data";
        }
        done();
      });
  });

  it("should get menu item #1", function(done) {
    request(baseUrl)
      .get('/foods/1')
      .expect('Content-Type', /json/)
      .expect(200) // Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        var item = res.body.food;
        throw "TODO: Validate data";
        done();
      });
  });
});
