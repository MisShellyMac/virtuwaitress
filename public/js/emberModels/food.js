App.Food = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('string'),
  active: DS.attr('string'),
  vegan: DS.attr('string'),
  vegetarian: DS.attr('string'),
  category: DS.attr('string'),
  gluten_free: DS.attr('string'),
  description: DS.attr('string')
});