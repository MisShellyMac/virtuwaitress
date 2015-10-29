"use strict";

var model = require('../models/graphs');

module.exports = {

  getMenuItemsByNumOrders: function(res) {
    model.getMenuItemsByNumOrders(res);
  },

  getMenuItemsByRatings: function(res) {
    model.getMenuItemsByRatings(res);
  }

};
