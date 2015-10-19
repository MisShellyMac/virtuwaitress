App.OrderItemController = Ember.ObjectController.extend({
  actions: {
    // Called when the "X" is clicked
    removeItem: function () {
      var model = this.get('model');
      model.deleteRecord();
      model.save();
    }
  }
});
