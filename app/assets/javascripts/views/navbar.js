RipeCom.Views.NavBar = Backbone.FusedView.extend({
  template: JST['navbar'],

  events: {

  },

  initialize: function(options){
    this.entity = options.entity;
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
