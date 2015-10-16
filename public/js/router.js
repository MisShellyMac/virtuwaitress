App.Router.map(function () {
  this.resource('foods', { path: '/' }, function () {
    // additional child routes will go here later
    this.route('active');
    this.route('completed');
    this.route('glutenfree');
    this.route('vegetarian');
    this.route('vegan');
  });
});

App.FoodsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('food');
  }
});

App.FoodsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('foods');
  }
});

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

App.FoodsActiveRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('food', function(item) {
      return !item.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('foods/index', {controller: controller});
  }
});

App.FoodsCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('food', function(item) {
      return item.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('foods/index', {controller: controller});
  }
});