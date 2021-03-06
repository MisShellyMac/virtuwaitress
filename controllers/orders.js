"use strict";

var model = require('../models/orders');

module.exports = {

  findAllActive: function(res) {
    model.getAllActiveOrders(res);
  },

  findAllPaid: function(res) {
    model.getAllPaidOrders(res);
  },

  submit: function(userId, res) {
    model.submit(userId, res);
  },

  pay: function(userId) {
    model.pay(userId);
  },

  getOrderStatus: function(userId, res) {
    model.getOrderStatus(userId, res);
  }

};
