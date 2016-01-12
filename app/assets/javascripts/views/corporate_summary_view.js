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
    var corporateAddresses = this.corporate.address().attributes.corporate.attributes.addresses;

    var latitude;
    var longitude;

    if(corporateAddresses){
      latitude = corporateAddresses[0].lat;
      longitude = corporateAddresses[0].lng;
    }else{
      corporateAddresses = [{}];
      latitude = 0;
      longitude = 0;
    };

    var content = this.template({
      corporate: this.corporate,
      corporateAddresses: corporateAddresses,
      latitude: latitude,
      longitude: longitude
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
