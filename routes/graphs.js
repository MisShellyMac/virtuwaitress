var express = require('express');
var router = express.Router();
var controller = require('../controllers/graphs');

router.get('/menuItemHistogram', function(req, res, next) {
  return controller.getMenuItemHistogram(res);
});

module.exports = router;
