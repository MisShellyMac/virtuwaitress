"use strict";

var model = require('../models/food');

module.exports = {

  find: function(id, res) {
    model.getMenuItem(id, res);
  },

  findAll: function(res) {
    model.getAllMenuItems(res);
  },

  update: function(id, item, res) {
    model.updateMenuItem(id, item, res);
  },

  create: function(item, res) {
    model.createMenuItem(item, res);
  },

  delete: function(id, res) {
    model.deleteMenuItem(id, res);
  },

  rate: function(id, rating, res) {
    model.rateMenuItem(id, rating, res);
  }

};
