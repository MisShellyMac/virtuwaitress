var express = require('express');
var router = express.Router();
var controller = require('../controllers/approvedSocialMedia');



// Find
router.get('/:id', function(req, res, next) {
  return controller.find(req.params.id, res);
});

// Find All (TODO order_id)
router.get('/', function(req, res, next) {
  return controller.findAll(res);
});

// Create
router.post('/', function(req, res, next) {
  return controller.create(req.body.item, res);
});

// Delete
router.delete('/:id', function(req, res, next) {
  return controller.delete(req.params.id, res);
});

module.exports = router;
