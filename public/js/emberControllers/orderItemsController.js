App.OrderItemsController = Ember.ArrayController.extend({
  actions: {
    createOrderItem: function () {
      
      // Get the data entered by the user and do some validation

      //TODO:
      var title = this.get('newTitle');

      // Create a new item
      var item = this.store.createRecord('orderItem', {
        menu_item_id: 3,
        order_id: 1
      });

      // Save the new model
      item.save();
    }
  }
});
