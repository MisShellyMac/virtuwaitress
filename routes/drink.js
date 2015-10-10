var express = require('express');
var router = express.Router();
var drinkController = require('../controllers/drink');

// GET /drink
router.get('/', function(req, res, next) {
  return drinkController.getAllDrink(res);
});

// GET /drink/gf
router.get('/gf', function(req, res, next) {
  return drinkController.getAllGFDrink(res);
});

// GET /drink/vegan
router.get('/vegan', function(req, res, next) {
  return drinkController.getAllVeganDrink(res);
});

// GET /drink/vegetarian
router.get('/vegetarian', function(req, res, next) {
  return drinkController.getAllVegetarianDrink(res);
});

module.exports = router;
