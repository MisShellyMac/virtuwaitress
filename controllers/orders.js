"use strict";

var model = require('../models/orders');

module.exports = {

  find: function(id, res) {
    model.getOrder(id, res);
  },

  findAll: function(res) {
    model.getAllOrders(res);
  },

  create: function(item, res) {
    model.createOrder(item, res);
  },

  submit: function(userId, res) {
    model.submit(userId, res);
  },

  pay: function(id, res) {
    model.pay(id, res);
  },

  getOrderStatus: function(userId, res) {
    model.getOrderStatus(userId, res);
  }

};
