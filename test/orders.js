"use strict";

var assert = require('assert');
var request = require('supertest');
var baseUrl = "http://localhost:3000"

describe("Order APIs", function() {
  it("should get active items", function(done) {
    request(baseUrl)
      .get('/orders/active')
      .expect('Content-Type', /json/)
      .expect(200) // Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        var items = res.body.orders;
        for (var i = 0; i < items.length; i++)
        {
          throw "TODO: Validate data";
        }
        done();
      });
  });

  it("should get paid items", function(done) {
    request(baseUrl)
      .get('/orders/paid')
      .expect('Content-Type', /json/)
      .expect(200) // Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        var items = res.body.orders;
        for (var i = 0; i < items.length; i++)
        {
          throw "TODO: Validate data";
        }
        done();
      });
  });});
