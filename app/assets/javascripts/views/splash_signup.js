RipeCom.Views.SplashSignup = Backbone.FusedView.extend({
  template: JST['main_signup'],
  className: 'splash-main',

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
