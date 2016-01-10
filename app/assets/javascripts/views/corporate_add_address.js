RipeCom.Views.CorporateAddAddress = Backbone.FusedView.extend({
  template: JST['corporate_add_address'],
  className: "ripe-modal",

  events: {
    "submit #corporate-add-address-form": "addAddress",
    "click #modal-close-button": "closeModal"
  },

  initialize: function(options){
    this.corporate = options.corporate;
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
    });
    this.$el.html(content);
    return this;
  },

  addAddress: function(event){
    event.preventDefault();
    var thisView = this;
    var data = $("#corporate-add-address-form").serializeJSON();
    data.address.locatable_id = this.corporate.id;
    data.address.locatable_type = "Corporate";

    $.post("/api/address", data, function(response){
        thisView.closeModal();
        thisView.corporate.fetch();
      }
    );
  },

  closeModal: function(event){
    if(event){ event.preventDefault(); };
    var $modalField = $("#ripe-overlay-field-master");
    $modalField.html("");
    this.remove();
  }
})
