var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  ready: function() {
  console.log("Ember.TEMPLATES: ", Ember.TEMPLATES);
}
 });

 App.ApplicationRoute = Ember.Route.extend({
   model: function() {
     return Ember.$.getJSON('/food').then(function(data) {
       return data;
     });
   }
 });
