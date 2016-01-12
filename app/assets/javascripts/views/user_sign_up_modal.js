RipeCom.Views.UserSignupModal = Backbone.FusedView.extend({
  template: JST['user_sign_up_modal'],
  className: 'ripe-modal',

  events: {
    "submit #signup-form": "signup",
    "click #modal-close-button": "closeModal",
  },

  initialize: function(options){

  },

  signup: function(event){
    event.preventDefault();

    var $form = this.$el.find("#signup-form");
    var data = $form.serializeJSON();
    data.user.guest = false;

    var newUser = new RipeCom.Models.User(data);
    newUser.save(data.user, {
      success: function(model){
        window.location = "/users/" + model.id;
      },

      error: function(model, response){
        RipeCom.Utils.insertErrorMessages(response.responseJSON);
        thisView.closeModal();
      }
    });
  },

  render: function(){
    var content = this.template({});
    this.$el.html(content);
    return this;
  },

  closeModal: function(event){
    if(event){ event.preventDefault(); };
    $("#ripe-overlay-field-master").html("");
    this.remove();
  }
})
