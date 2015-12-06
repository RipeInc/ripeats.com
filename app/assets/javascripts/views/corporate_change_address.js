RipeCom.Views.CorporateChangeAddress = Backbone.FusedView.extend({
  template: JST['corporate_change_address'],
  className: "ripe-modal",

  events: {
    "submit #corporate-change-address-form": "updateAddress",
    "click #modal-close-button": "closeModal"
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.address = options.address;
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
      address: this.address
    });
    this.$el.html(content);
    return this;
  },

  updateAddress: function(event){
    var thisView = this;
    event.preventDefault();
    var data = $("#corporate-change-address-form").serializeJSON();

    this.address.save(data.address, {
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
    var $modalField = $("#ripe-overlay-field-master");
    $modalField.html("");
    this.remove();
  }
})
