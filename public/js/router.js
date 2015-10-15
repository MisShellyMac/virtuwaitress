App.Router.map(function () {
  this.resource('foods', { path: '/' }, function () {
    // additional child routes will go here later
    this.route('active');
    this.route('completed');
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