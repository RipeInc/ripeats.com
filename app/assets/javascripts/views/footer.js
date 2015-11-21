RipeCom.Views.FooterView = Backbone.FusedView.extend({
  template: JST['footer'],

  events: {

  },

  initialize: function(options){

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
