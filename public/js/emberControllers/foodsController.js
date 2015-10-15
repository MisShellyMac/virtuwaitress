App.FoodsController = Ember.ArrayController.extend({
  actions: {
    clearCompleted: function () {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },
    createFood: function () {
      // Get the title set by the text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create a new food
      var item = this.store.createRecord('food', {
        title: title,
        isCompleted: false
      });

      // Clear the text field
      this.set('newTitle', '');

      // Save the new model
      item.save();
    }
  },
  hasCompleted: function () {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function () {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted')

});
