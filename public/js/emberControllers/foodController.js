App.FoodController = Ember.ObjectController.extend({
  actions: {
    // Called when the admin title is clicked
    editTitle: function () {
      this.set('isEditingTitle', true);
    },
    // Called when the admin price is clicked
    editPrice: function () {
      this.set('isEditingPrice', true);
    },
    // Called when the admin description is clicked
    editDescription: function () {
      this.set('isEditingDescription', true);
    },
    // Called when the admin image is clicked
    editImage: function () {
      this.set('isEditingImage', true);
    },
    // Called when an admin text box is clicked away from or Enter is pressed
    acceptChange: function () {
      // Clear all the editing properties so no text boxes are shown
      this.set('isEditingTitle', false);
      this.set('isEditingPrice', false);
      this.set('isEditingDescription', false);
      this.set('isEditingImage', false);

      this.get('model').save();
    },
    // Called when an item is rated on the menu page
    rateAs1Star: function () {
      // Issue a PUT request to update a rating
      $.ajax({ type: "PUT",
        url: "/foods/rate/" + this.get('model').get('id') + "/1" });
      // Update the UI
      this.set('myRatingHas1Star', true);
      this.get('model').save();
    },
    // Called when an item is rated on the menu page
    rateAs2Stars: function () {
      // Issue a PUT request to update a rating
      $.ajax({ type: "PUT",
        url: "/foods/rate/" + this.get('model').get('id') + "/2" });
      // Update the UI
      this.set('myRatingHas1Star', true);
      this.set('myRatingHas2Stars', true);
      this.get('model').save();
    },
    // Called when an item is rated on the menu page
    rateAs3Stars: function () {
      // Issue a PUT request to update a rating
      $.ajax({ type: "PUT",
        url: "/foods/rate/" + this.get('model').get('id') + "/3" });
      // Update the UI
      this.set('myRatingHas1Star', true);
      this.set('myRatingHas2Stars', true);
      this.set('myRatingHas3Stars', true);
      this.get('model').save();
    },
    // Called when an item is rated on the menu page
    rateAs4Stars: function () {
      // Issue a PUT request to update a rating
      $.ajax({ type: "PUT",
        url: "/foods/rate/" + this.get('model').get('id') + "/4" });
      // Update the UI
      this.set('myRatingHas1Star', true);
      this.set('myRatingHas2Stars', true);
      this.set('myRatingHas3Stars', true);
      this.set('myRatingHas4Stars', true);
      this.get('model').save();
    },
    // Called when an item is rated on the menu page
    rateAs5Stars: function () {
      // Issue a PUT request to update a rating
      $.ajax({ type: "PUT",
        url: "/foods/rate/" + this.get('model').get('id') + "/5" });
      // Update the UI
      this.set('myRatingHas1Star', true);
      this.set('myRatingHas2Stars', true);
      this.set('myRatingHas3Stars', true);
      this.set('myRatingHas4Stars', true);
      this.set('myRatingHas5Stars', true);
      this.get('model').save();
    },
    // Called when the admin "X" is clicked
    removeItem: function () {
      var model = this.get('model');
      model.deleteRecord();
      model.save();
    }
  },

  // Properties used by the admin UI to toggle the visibility of text boxes:
  isEditingTitle: false,
  isEditingPrice: false,
  isEditingDescription: false,
  isEditingImage: false,
  
  // This property is used by the admin UI to change the display of inactive items
  // When set, this updates the model, which triggers the data update
  isInactive: function (key, value) {
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return !model.get('active');
    } else {
      // property being used as a setter
      model.set('active', !value);
      model.save();
      return value;
    }
  }.property('model.isInactive'),

  // Properties that make toggling the admin checkboxes update the stored data:
  watchVegan:      function() { this.get('model').save(); }.observes('vegan'),
  watchVegetarian: function() { this.get('model').save(); }.observes('vegetarian'),
  watchGlutenFree: function() { this.get('model').save(); }.observes('gluten_free'),

  // A property that makes changing the category dropdown update the stored data: 
  watchCategory:   function() { this.get('model').save(); }.observes('category'),

  // Rating properties for Ember binding:
  has1Star:        function () { return this.get('model').get('avg_rating') >= 0.5; }.property('model.has1Star'),
  has2Stars:       function () { return this.get('model').get('avg_rating') >= 1.5; }.property('model.has2Stars'),
  has3Stars:       function () { return this.get('model').get('avg_rating') >= 2.5; }.property('model.has3Stars'),
  has4Stars:       function () { return this.get('model').get('avg_rating') >= 3.5; }.property('model.has4Stars'),
  has5Stars:       function () { return this.get('model').get('avg_rating') >= 4.5; }.property('model.has5Stars'),

  // Category properties for Ember handlebar binding on the menu page:  
  isAppetizer:         function () { return this.get('model').get('category') == 'Appetizer';   }.property('model.isAppetizer'),
  isSalad:             function () { return this.get('model').get('category') == 'Salad';       }.property('model.isSalad'),
  isEntree:            function () { return this.get('model').get('category') == 'Entree';      }.property('model.isEntree'),
  isDessert:           function () { return this.get('model').get('category') == 'Dessert';     }.property('model.isDessert'),
  isAlcoholicDrink:    function () { return this.get('model').get('category') == 'Alcohol';     }.property('model.isAlcoholicDrink'),
  isNonAlcoholicDrink: function () { return this.get('model').get('category') == 'Non_Alcohol'; }.property('model.isNonAlcoholicDrink'),

  // Properties for the modal dialogs on the menu page:  
  menuModalId:         function () { return "menuModal" + this.get('model').get('id');          }.property('model.menuModalId'),
  menuModalLink:       function () { return "#menuModal" + this.get('model').get('id');         }.property('model.menuModalLink')
   
});

// Used to populate the admin dropdowns. Must match names in the database.
App.validCategories = ["Appetizer", "Salad", "Entree", "Dessert", "Alcohol", "Non_Alcohol"];
