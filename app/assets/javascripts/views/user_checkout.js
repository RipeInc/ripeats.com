RipeCom.Views.UserCheckout = Backbone.FusedView.extend({
  template: JST['user_checkout'],
  className: 'ripe-modal',
  events: {
    "click #modal-close-button": "closeModal",
    "submit #user-checkout-form": "pay",
  },

  initialize: function(options){
    this.user = options.user;
    this.deals = options.deals;
  },

  render: function(){
    var content = this.template({
      user: this.user,
      deals: this.deals
    });

    this.$el.html(content);
    return this;
  },

  pay: function(event){
    event.preventDefault();
    var thisView = this;

    var data = $("#user-checkout-form").serializeJSON();

    data.transaction.deals = [];
    this.deals.forEach(function(deal){
      data.transaction.deals.push([deal.attributes.id, deal.currentPrice()]);
    });

    var newTransaction = new RipeCom.Models.Transaction();
    debugger;

    newTransaction.save(data.transaction, {
      success: function(model, response){
        debugger;
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
