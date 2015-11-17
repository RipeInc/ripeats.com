RipeCom.Views.SplashLogin = Backbone.FusedView.extend({
  template: JST['login'],

  events: {

  },

  initialize: function(){

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.fusion();

    return this;
  }
})
