RipeCom.Views.SplashLogin = Backbone.FusedView.extend({
  template: JST['main_login'],
  className: 'splash-main',

  events: {
    "click .form-switch-user": "swapToUser",
    "click .form-switch-restaurant": "swapToRestaurant",
  },

  initialize: function(options){
    this.userFormTemplate = JST['signin_user'];
    this.restaurantFormTemplate = JST['signup_restaurant'];
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  swapToUser: function(){
    var content = this.userFormTemplate();
    this.$el.find("#main-form-holder").html(content);
  },

  swapToRestaurant: function(){
    var content = this.restaurantFormTemplate();
    this.$el.find("#main-form-holder").html(content);
  }
})
