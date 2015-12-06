RipeCom.Views.CorporateChangeContact = Backbone.FusedView.extend({
  template: JST['corporate_change_contact'],
  className: "ripe-modal",

  events: {
    "submit #corporate-change-contact-form": "changeContact",
    "click #close-modal-button": "closeModal"
  },

  initialize: function(options){
    this.corporate = options.corporate;
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate
    });
    this.$el.html(content);
    return this;
  },

  changeContact: function(event){
    event.preventDefault();
    var thisView = this;

    var data = $("#corporate-change-contact-form").serializeJSON();
    this.corporate.save(data.corporate, {
      success: function(model, response){
        thisView.closeModal();
      },

      error: function(model, response){
        debugger;
      }
    });
  },

  closeModal: function(event){
    if(event){ event.preventDefault(); };
    $("#ripe-overlay-field-master").html("");
    this.remove();
  }
})
