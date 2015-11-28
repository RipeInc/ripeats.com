RipeCom.Views.SplashLogin = Backbone.FusedView.extend({
  template: JST['main_login'],
  className: 'splash-main',

  events: {
    "submit #login-form": "login"

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

  login: function(event){
    event.preventDefault();

    alert("logging in!");
    var $form = this.$el.find("#login-form");
    var data = $form.serializeJSON();
    console.log(data);

    $.ajax({
      url: "/api/sessions",
      method: "POST",
      data: data,
      success: function(response){
        debugger;
      },
      error: function(response){
        debugger;
      }
    })
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
