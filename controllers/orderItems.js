"use strict";

var model = require('../models/orderItems');

module.exports = {

  find: function(id, res) {
    model.getOrderItem(id, res);
  },

  findAll: function(order_id, res) {
    model.getAllOrderItems(order_id, res);
  },

  create: function(item, res) {
    model.createOrderItem(item, res);
  },

  delete: function(id, res) {
    model.deleteOrderItem(id, res);
  }

};