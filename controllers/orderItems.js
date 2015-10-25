"use strict";

var model = require('../models/orderItems');

module.exports = {

  findAll: function(userId, res) {
    model.getAllOrderItems(userId, res);
  },

  findMostRecentlyPaid: function(userId, res) {
    model.getMostRecentlyPaid(userId, res);
  },

  create: function(item, res) {
    model.createOrderItem(item, res);
  },

  delete: function(id, res) {
    model.deleteOrderItem(id, res);
  }

};
