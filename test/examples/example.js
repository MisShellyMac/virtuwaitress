"use strict";

/*
var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) throw err;
        done();
      });
    });
  });
});

describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    // pending test below
    it('should return -1 when the value is not present');
  });
});

var assert = require('assert');

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});

describe('api', function() {
  describe('GET /api/users', function() {
    it('respond with an array of users', function() {
      // ...
    });
  });
});

describe('app', function() {
  describe('GET /users', function() {
    it('respond with an array of users', function() {
      // ...
    });
  });
});

describe('Array', function() {
    before(function() {
      // ...
    });

    describe('#indexOf()', function() {
      context('when not present', function() {
        it('should not throw an error', function() {
          (function() {
            [1,2,3].indexOf(4);
          }).should.not.throw();
        });
        it('should return -1', function() {
          [1,2,3].indexOf(4).should.equal(-1);
        });
      });
      context('when present', function() {
        it('should return the index where the element first appears in the array', function() {
          [1,2,3].indexOf(3).should.equal(2);
        });
      });
    });
  });

  module.exports = {
    before: function() {
      // ...
    },

    'Array': {
      '#indexOf()': {
        'should return -1 when not present': function() {
          [1,2,3].indexOf(4).should.equal(-1);
        }
      }
    }
  };

var testCase = require('mocha').describe;
var pre = require('mocha').before;
var assertions = require('mocha').it;
var assert = require('assert');

testCase('Array', function() {
  pre(function() {
    // ...
  });

  testCase('#indexOf()', function() {
    assertions('should return -1 when not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe("JSON", function() {
   describe(".parse()", function() {
       it("should detect malformed JSON strings", function(){
           //Test Goes Here
       });
   });
});

exports.parse = function(args) {
   var options = {}
   for (var i in args) { //Cycle through args
       var arg = args[i];
       //Check if Long formed tag
       if (arg.substr(0, 2) === "--") {
           arg = arg.substr(2);
           //Check for equals sign
           if (arg.indexOf("=") !== -1) {
               arg = arg.split("=");
               var key = arg.shift();
               options[key] = arg.join("=");
           }
       }
   }
   return options;
}

it("should parse long formed tags and convert numbers", function(){
    var args = ["--depth=4", "--hello=world"];
    var results = tags.parse(args);

    expect(results).to.have.a.property("depth", 4);
    expect(results).to.have.a.property("hello", "world");
});
it("should fallback to defaults", function(){
    var args = ["--depth=4", "--hello=world"];
    var defaults = { depth: 2, foo: "bar" };
    var results = tags.parse(args, defaults);

    var expected = {
        depth: 4,
        foo: "bar",
        hello: "world"
    };

    expect(results).to.deep.equal(expected);
});

it("should accept tags without values as a bool", function(){
    var args = ["--searchContents"];
    var results = tags.parse(args);

    expect(results).to.have.a.property("searchContents", true);
});

it("should accept short formed tags", function(){
    var args = ["-sd=4", "-h"];
    var replacements = {
        s: "searchContents",
        d: "depth",
        h: "hello"
    };

    var results = tags.parse(args, {}, replacements);

    var expected = {
        searchContents: true,
        depth: 4,
        hello: true
    };

    expect(results).to.deep.equal(expected);
});

describe("#match()", function(){
    it("should find and return matches based on a query", function(){
        var files = ["hello.txt", "world.js", "another.js"];
        var results = search.match(".js", files);
        expect(results).to.deep.equal(["world.js", "another.js"]);

        results = search.match("hello", files);
        expect(results).to.deep.equal(["hello.txt"]);
    });
});


exports.match = function(query, files){
  var matches = [];
  files.forEach(function(name) {
      if (name.indexOf(query) !== -1) {
          matches.push(name);
      }
  });
  return matches;
}

describe("Color Code Converter", function() {
  describe("RGB to Hex conversion", function() {
  });

  describe("Hex to RGB conversion", function() {
  });
});

describe("Color Code Converter", function() {
  describe("RGB to Hex conversion", function() {
    it("converts the basic colors", function() {

    });
  });

  describe("Hex to RGB conversion", function() {
    it("converts the basic colors", function() {

    });
  });
});

describe("Color Code Converter API", function() {

  describe("RGB to Hex conversion", function() {

    var url = "http://localhost:3000/rgbToHex?red=255&green=255&blue=255";

    it("returns status 200", function() {});

    it("returns the color in hex", function() {});

  });

  describe("Hex to RGB conversion", function() {

    var url = "http://localhost:3000/hexToRgb?hex=00ff00";

    it("returns status 200", function() {});

    it("returns the color in RGB", function() {});

  });

});

describe("Color Code Converter API", function() {

  describe("RGB to Hex conversion", function() {

    var url = "http://localhost:3000/rgbToHex?red=255&green=255&blue=255";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

    it("returns the color in hex", function() {
      request(url, function(error, response, body) {
        expect(body).to.equal("ffffff");
      });
    });

  });

  describe("Hex to RGB conversion", function() {
    var url = "http://localhost:3000/hexToRgb?hex=00ff00";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

    it("returns the color in RGB", function() {
      request(url, function(error, response, body) {
        expect(body).to.equal("[0,255,0]");
      });
    });
  });

});

describe("Color Code Converter API", function() {

  describe("RGB to Hex conversion", function() {

    var url = "http://localhost:3000/rgbToHex?red=255&green=255&blue=255";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns the color in hex", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.equal("ffffff");
        done();
      });
    });

  });

  describe("Hex to RGB conversion", function() {
    var url = "http://localhost:3000/hexToRgb?hex=00ff00";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns the color in RGB", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.equal("[0,255,0]");
        done();
      });
    });
  });

});

// var express = require("express");
// var app = express();
// var converter = require("./converter");
//
// app.get("/rgbToHex", function(req, res) {
//   var red   = parseInt(req.query.red, 10);
//   var green = parseInt(req.query.green, 10);
//   var blue  = parseInt(req.query.blue, 10);
//
//   var hex = converter.rgbToHex(red, green, blue);
//
//   res.send(hex);
// });
//
// app.get("/hexToRgb", function(req, res) {
//   var hex = req.query.hex;
//
//   var rgb = converter.hexToRgb(hex);
//
//   res.send(JSON.stringify(rgb));
// });
//
// app.listen(3000);
*/
