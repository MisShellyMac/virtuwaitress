"use strict";

var assert = require('assert');
var request = require('supertest');
var baseUrl = "http://localhost:3000"

describe("Social Media APIs", function() {
  it("should get all approved social media items", function(done) {
    request(baseUrl)
      .get('/approvedSocialMedia')
      .expect('Content-Type', /json/)
      .expect(200) // Status code
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        var items = res.body.approved_social_media;
        for (var i = 0; i < items.length; i++)
        {
          throw "TODO: Validate data";
        }
        done();
      });
  });
});
