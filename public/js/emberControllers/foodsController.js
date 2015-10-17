App.FoodsController = Ember.ArrayController.extend({
  actions: {
    createMenuItem: function () {
      
      // Get the data entered by the user and do some validation

      var inactive = this.get('newInactive');
      var active = (inactive != true); // Because the value can be true, false, or undefined    

      var vegan = this.get('newVegan') == true; // Because the value can be true, false, or undefined
      var vegetarian = this.get('newVegetarian') == true; // Because the value can be true, false, or undefined
      var glutenFree = this.get('newGlutenFree') == true; // Because the value can be true, false, or undefined

      var category = this.get('newCategory');

      var title = this.get('newTitle');
      if (!title.trim()) { alert("You must enter a title."); return; }

      var price = this.get('newPrice');
      price = new Number(price);

      var description = this.get('newDescription');
      if (!description.trim()) { alert("You must enter a description."); return; }

      var image = this.get('newImage');

      // Create a new item
      var item = this.store.createRecord('food', {
        category: category,
        title: title,
        price: price,
        description: description,
        image_url: image,
        active: active,
        vegan: vegan,
        vegetarian: vegetarian,
        gluten_free: glutenFree
      });

      // Clear the text boxes and other UI
      this.set('newInactive', false);
      this.set('newVegan', false);
      this.set('newVegetarian', false);
      this.set('newGlutenFree', false);
      this.set('newTitle', '');
      this.set('newPrice', '');
      this.set('newImage', '');

      // Save the new model
      item.save();
    }
  }
});
