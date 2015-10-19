var express = require('express');
var router = express.Router();
var controller = require('../controllers/orders');

// Expose APIs matching the expectations of the Ember RESTAdapter:
// ---------------------------------------
// Action     HTTP Verb   URL
// ---------------------------------------
// Find       GET         /orders/123
// Find All   GET         /orders
// Update     PUT         (not supported)
// Create     POST        /orders
// Delete     DELETE      (not supported)
// ---------------------------------------

// Find
router.get('/:id', function(req, res, next) {
  return controller.find(req.params.id, res);
});

// Find All
router.get('/', function(req, res, next) {
  return controller.findAll(res);
});

// Create
router.post('/', function(req, res, next) {
  return controller.create(req.body.order, res);
});

// Plus, an API for submitting an order
router.put('/submit/:id', function(req, res, next) {
  return controller.submit(req.params.id, res);
});

module.exports = router;
