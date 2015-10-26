"use strict";

var assert = require('assert');
var request = require('supertest');
var baseUrl = "http://localhost:3000"

describe("Order Item APIs", function() {
  it("should get all active order items for user #2", function(done) {
    request(baseUrl)
      .get('/orderItems/2')
      .expect('Content-Type', /json/)
      .expect(200) // Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        var items = res.body.orderItems;
        for (var i = 0; i < items.length; i++)
        {
          throw "TODO: Validate data";
        }
        done();
      });
  });

  it("should get most recently paid items for user #2", function(done) {
    request(baseUrl)
      .get('/orderItems/mostRecentlyPaid/2')
      .expect('Content-Type', /json/)
      .expect(200) // Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        var items = res.body.orderItems;
        for (var i = 0; i < items.length; i++)
        {
          throw "TODO: Validate data";
        }
        done();
      });
  });});
