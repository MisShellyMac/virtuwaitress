"use strict";

var drinkModel = require('../models/drink');

module.exports = {

  getAllDrink: function(res) {
    drinkModel.getAllDrink(res);
  },

  getAllGFDrink: function(res) {
    drinkModel.getAllGFDrink(res);
  },

  getAllVeganDrink: function(res){
    drinkModel.getAllVeganDrink(res);
  },

  getAllVegetarianDrink: function(res){
    drinkModel.getAllVegetarianDrink(res);
  },

};
