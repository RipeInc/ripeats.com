RipeCom.Views.SplashSearch = Backbone.FusedView.extend({
  template: JST['main_search'],
  className: 'splash-main',

  events: {

  },

  initialize: function(options){

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    this.fusion();

    return this;
  }
})
