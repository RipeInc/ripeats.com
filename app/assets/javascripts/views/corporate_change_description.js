RipeCom.Views.CorporateChangeDescription = Backbone.FusedView.extend({
  template: JST['corporate_change_description'],
  className: "ripe-modal",
  events: {
    "submit #corporate-change-description-form": "changeDescription",
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

  changeDescription: function(event){
    event.preventDefault();
    var thisView = this;

    var data = $("#corporate-change-description-form").serializeJSON();
    this.corporate.save(data.corporate, {
      success: function(model, response){
        thisView.closeModal();
      },

      error: function(model, response){
        debugger;
      }
    })
  },

  closeModal: function(event){
    if(event){ event.preventDefault(); };
    $("#ripe-overlay-field-master").html("");
    this.remove();
  }
})
