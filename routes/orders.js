var express = require('express');
var router = express.Router();
var controller = require('../controllers/orders');

// Get all active orders
router.get('/active', function(req, res, next) {
  return controller.findAllActive(res);
});

// Get all paid orders
router.get('/paid', function(req, res, next) {
  return controller.findAllPaid(res);
});

// An API for submitting an order
router.put('/submit/:userId', function(req, res, next) {
  return controller.submit(req.params.userId, res);
});

// An API for getting the user's order status
router.get('/status/:userId', function(req, res, next) {
  return controller.getOrderStatus(req.params.userId, res);
});

module.exports = router;
