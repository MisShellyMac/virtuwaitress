App.FoodController = Ember.ObjectController.extend({
  actions: {
    editItem: function () {
      this.set('isEditing', true);
    },
    acceptChanges: function () {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeItem');
      } else {
        this.get('model').save();
      }
    },
    removeItem: function () {
      var model = this.get('model');
      model.deleteRecord();
      model.save();
    }
  },

  isEditing: false,

  isCompleted: function (key, value) {
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'),

  isAppetizer:         function () { return this.get('model').get('category') == 'Appetizer';   }.property('model.isAppetizer'),
  isSalad:             function () { return this.get('model').get('category') == 'Salad';       }.property('model.isSalad'),
  isEntree:            function () { return this.get('model').get('category') == 'Entree';      }.property('model.isEntree'),
  isDessert:           function () { return this.get('model').get('category') == 'Dessert';     }.property('model.isDessert'),
  isAlcoholicDrink:    function () { return this.get('model').get('category') == 'Alcohol';     }.property('model.isAlcoholicDrink'),
  isNonAlcoholicDrink: function () { return this.get('model').get('category') == 'Non_Alcohol'; }.property('model.isNonAlcoholicDrink')

});
