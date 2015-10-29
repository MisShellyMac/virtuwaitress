var express = require('express');
var router = express.Router();
var controller = require('../controllers/graphs');

router.get('/menuItemsByNumOrders', function(req, res, next) {
  return controller.getMenuItemsByNumOrders(res);
});

router.get('/menuItemsByRatings', function(req, res, next) {
  return controller.getMenuItemsByRatings(res);
});

module.exports = router;
