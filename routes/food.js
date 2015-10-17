var express = require('express');
var router = express.Router();
var controller = require('../controllers/food');

// Expose APIs matching the expectations of the Ember RESTAdapter:
// ---------------------------------------
// Action     HTTP Verb   URL
// ---------------------------------------
// Find       GET         /foods/123
// Find All   GET         /foods
// Update     PUT         /foods/123
// Create     POST        /foods
// Delete     DELETE      /foods/123
// ---------------------------------------

// Find
router.get('/:id', function(req, res, next) {
  return controller.find(req.params.id, res);
});

// Find All
router.get('/', function(req, res, next) {
  return controller.findAll(res);
});

// Update
router.put('/:id', function(req, res, next) {
  return controller.update(req.params.id, req.body.food, res);
});

// Create
router.post('/', function(req, res, next) {
  return controller.create(req.body.food, res);
});

// Delete
router.delete('/:id', function(req, res, next) {
  return controller.delete(req.params.id, res);
});

// Plus, an API for rating a menu item
router.put('/rate/:id/:rating', function(req, res, next) {
  return controller.rate(req.params.id, new Number(req.params.rating), res);
});

module.exports = router;
