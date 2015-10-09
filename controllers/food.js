"use strict";

var foodModel = require('../models/food');

module.exports = {

  getAllFood: function(res) {
    foodModel.getAllFood(res);
  }

};
