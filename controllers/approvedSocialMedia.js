"use strict";

var model = require('../models/approvedSocialMedia');

module.exports = {

  find: function(id, res) {
    model.getApprovedSocialMedia(id, res);
  },

  findAll: function(order_id, res) {
    model.getAllApprovedSocialMedia(order_id, res);
  },

  create: function(item, res) {
    model.createApprovedSocialMedia(item, res);
  },
  delete: function(id, res) {
    model.deleteApprovedSocialMedia(id, res);
  }

};
