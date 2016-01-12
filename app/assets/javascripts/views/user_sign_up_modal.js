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
