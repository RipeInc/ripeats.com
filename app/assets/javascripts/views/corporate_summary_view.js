RipeCom.Views.CorporateSummaryView = Backbone.FusedView.extend({
  template: JST['corporate_summary'],
  className: 'ripe-modal',

  events: {
    "click #modal-close-button": "closeModal",
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.listenTo(this.corporate, 'sync update', this.render.bind(this));
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate
    });
    this.$el.html(content);
    return this;
  },

  closeModal: function(event){
    if(event){ event.preventDefault(); };
    $("#ripe-overlay-field-master").html("");
    this.remove();
  }
})
