var express = require('express');
var router = express.Router();
var foodController = require('../controllers/food');

// GET /food
router.get('/', function(req, res, next) {
  return foodController.getAllFood(res);
});

// GET /food/gf
router.get('/gf', function(req, res, next) {
  return foodController.getAllGFFood(res);
});

// GET /food/vegan
router.get('/vegan', function(req, res, next) {
  return foodController.getAllVeganFood(res);
});

// GET /food/vegetarian
router.get('/vegetarian', function(req, res, next) {
  return foodController.getAllVegetarianFood(res);
});

module.exports = router;
