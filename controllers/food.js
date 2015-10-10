"use strict";

var foodModel = require('../models/food');

module.exports = {

  getAllFood: function(res) {
    foodModel.getAllFood(res);
  },

  getAllGFFood: function(res) {
    foodModel.getAllGFFood(res);
  },

  getAllVeganFood: function(res){
    foodModel.getAllVeganFood(res);
  },

  getAllVegetarianFood: function(res){
    foodModel.getAllVegetarianFood(res);
  },

};
