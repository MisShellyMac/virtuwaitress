var express = require('express');
var router = express.Router();
var controller = require('../controllers/orderItems');

// Find All
router.get('/:userId', function(req, res, next) {
  return controller.findAll(req.params.userId, res);
});

// Create
router.post('/', function(req, res, next) {
  return controller.create(req.body.orderItem, res);
});

// Delete
router.delete('/:id', function(req, res, next) {
  return controller.delete(req.params.id, res);
});

module.exports = router;
