RipeCom.Views.SplashSignup = Backbone.FusedView.extend({
  template: JST['main_signup'],
  className: 'splash-main',

  events: {
    "click .form-switch-user": "swapToUser",
    "click .form-switch-restaurant": "swapToRestaurant",
    "submit #new-user-form": "createNewUser"
  },

  initialize: function(options){
    this.userFormTemplate = JST['signup_user'];
    this.restaurantFormTemplate = JST['signup_restaurant'];
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createNewUser: function(event){
    event.preventDefault();

    var $form = this.$el.find("#new-user-form");
    var data = $form.serializeJSON();

    var newUser = new RipeCom.Models.User(data);
    newUser.save(data.user, {
      success: function(model){
        window.location = "/users/" + model.id;
      },

      error: function(model, response){
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
