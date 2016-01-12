RipeCom.Views.UserLoginModal = Backbone.FusedView.extend({
  template: JST['user_log_in_modal'],
  className: 'ripe-modal',

  events: {
    "submit #login-form": "login",
    "click #modal-close-button": "closeModal",
  },

  initialize: function(options){

  },

  login: function(event){
    debugger;
    event.preventDefault();
    var thisView = this;

    var $form = this.$el.find("#login-form");
    var data = $form.serializeJSON();

    $.ajax({
      url: "/api/sessions",
      method: "POST",
      data: data,
      success: function(response){
        if(response.username){
          window.location = "/users/" + response.id;
        }else{
          window.location = "/corporates/" + response.id;
        }

      },
      error: function(response){
        RipeCom.Utils.insertErrorMessages(["Credential match failed."]);
        thisView.closeModal();
      }
    })
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
