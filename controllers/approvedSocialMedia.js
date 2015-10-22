"use strict";

var model = require('../models/approvedSocialMedia');

module.exports = {

  find: function(id, res) {
    model.getApprovedSocialMedia(id, res);
  },

  findAll: function(res) {
    model.getAllApprovedSocialMedia(res);
  },

  create: function(item, res) {
    model.createApprovedSocialMediaItem(item, res);
  },
  delete: function(id, res) {
    model.deleteApprovedSocialMediaItem(id, res);
  }

};
