var express = require('express');
var router = express.Router();
var controller = require('../controllers/orders');

/* TODO unused:
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
*/

// An API for submitting an order
router.put('/submit/:userId', function(req, res, next) {
  return controller.submit(req.params.userId, res);
});

// An API for getting the user's order status
router.get('/status/:userId', function(req, res, next) {
  return controller.getOrderStatus(req.params.userId, res);
});

module.exports = router;
