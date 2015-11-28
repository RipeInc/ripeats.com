RipeCom.Views.SplashLogin = Backbone.FusedView.extend({
  template: JST['main_login'],
  className: 'splash-main',

  events: {
    "submit #login-form": "loginCorporate"

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

  loginCorporate: function(event){
    event.preventDefault();
    var $form = this.$el.find("#login-form");
    var data = $form.serializeJSON();

    $.ajax({
      url: "/api/sessions",
      method: "POST",
      data: data,
      success: function(response){
        window.location = "/corporates/" + response.id;
      },
      error: function(response){
        RipeCom.Utils.insertErrorMessages(["Credential match failed."]);
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
