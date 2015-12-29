RipeCom.Views.CorporatePostDeal = Backbone.FusedView.extend({
  template: JST['corporate_post_deal'],
  className: 'ripe-modal',

  events: {
    "click #modal-close-button": "closeModal",
    "submit #corporate-new-deal-form": "createNewDeal"
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.menuItem = options.menuItem;
    this.deals = this.corporate.activeDeals();
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
      menuItem: this.menuItem
    });

    this.$el.html(content);
    return this;
  },

  createNewDeal: function(event){
    event.preventDefault();
    var thisView = this;

    var data = $("#corporate-new-deal-form").serializeJSON();
    var newDeal = new RipeCom.Models.Deal();

    data.deal.quantity = Number(data.deal.quantity);
    data.deal.price = Number(this.$el.find("#start-integer").val())*100 + Number(this.$el.find("#start-float").val());
    data.deal.least_price = Number(this.$el.find("#end-integer").val())*100 + Number(this.$el.find("#end-float").val());
    data.deal.corporate_id = this.corporate.id;
    data.deal.expire = false;

    var startDate = Date.now();
    var increment = this.$el.find("#time-increment").val();
    data.deal.expiration = new Date(startDate + Number(increment)*1000);

    newDeal.save(data.deal, {
      success: function(model, response){
        thisView.deals.add(model);
        $("#active-deals-tab > a").trigger("click")
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
