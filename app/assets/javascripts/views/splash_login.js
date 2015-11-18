RipeCom.Views.SplashLogin = Backbone.FusedView.extend({
  template: JST['main_login'],

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
