import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  tweet: attr('string'),
  user: DS.belongsTo('user')
});
