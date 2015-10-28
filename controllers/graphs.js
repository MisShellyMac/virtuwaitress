"use strict";

var model = require('../models/graphs');

module.exports = {

  getMenuItemHistogram: function(res) {
    model.getMenuItemHistogram(res);
  }

};
