App.Router.map(function () {
  // Set up the Ember support for foods and filtered subsets
  this.resource('foods', { path: '/' }, function () {
    // additional child routes
    this.route('glutenfree');
    this.route('vegetarian');
    this.route('vegan');
  });
});

// "foods" route
App.FoodsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('food');
  }
});

// Show all menu items
App.FoodsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('foods');
  }
});

// Filter by gluten-free
App.FoodsGlutenfreeRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('food', function(item) {
      return item.get('gluten_free');
    });
  },
  renderTemplate: function(controller) {
    this.render('foods/index', {controller: controller});
  }
});

// Filter by vegetarian
App.FoodsVegetarianRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('food', function(item) {
      return item.get('vegetarian');
    });
  },
  renderTemplate: function(controller) {
    this.render('foods/index', {controller: controller});
  }
});

// Filter by vegan
App.FoodsVeganRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('food', function(item) {
      return item.get('vegan');
    });
  },
  renderTemplate: function(controller) {
    this.render('foods/index', {controller: controller});
  }
});
