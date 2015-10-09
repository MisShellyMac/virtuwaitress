"use strict";

var drinkModel = require('../models/drink');

module.exports = {

  getAllDrink: function(res) {
    drinkModel.getAllDrink(res);
  }

};
