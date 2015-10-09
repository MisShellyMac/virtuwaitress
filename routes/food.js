var express = require('express');
var router = express.Router();
var foodController = require('../controllers/food');

// GET /food
router.get('/', function(req, res, next) {
  return foodController.getAllFood(res);
});

module.exports = router;
