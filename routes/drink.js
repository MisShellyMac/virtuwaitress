var express = require('express');
var router = express.Router();
var drinkController = require('../controllers/drink');

// GET /drink
router.get('/', function(req, res, next) {
  return drinkController.getAllDrink(res);
});

module.exports = router;
