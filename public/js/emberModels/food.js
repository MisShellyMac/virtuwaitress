App.Food = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  active: DS.attr('boolean'),
  vegan: DS.attr('boolean'),
  vegetarian: DS.attr('boolean'),
  category: DS.attr('string'),
  gluten_free: DS.attr('boolean'),
  description: DS.attr('string'),
  total_ratings: DS.attr('number'),
  avg_rating: DS.attr('number'),
  image_url: DS.attr('string')
});
