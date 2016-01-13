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
    data.deal.deal_image = this.menuItem.attributes.item_image;
    data.deal.menu_item_id = thisView.menuItem.attributes.id;

    debugger;
    // CAUTION!
    if(thisView.menuItem.attributes.original_price){
      data.deal.original_price = Number(thisView.menuItem.attributes.original_price);
    }else{
      data.deal.original_price = Number(thisView.menuItem.attributes.price);
    }

    var endInteger = thisView.$el.find("#end-integer").val();
    var endFloat = thisView.$el.find("#end-float").val();

    if(!endInteger && !endFloat){
      data.deal.least_price = Math.floor(Number(data.deal.original_price * 0.5));
    }else{
      data.deal.least_price = Number(endInteger)*100 + Number(endFloat);
    }
    data.deal.corporate_id = this.corporate.id;
    data.deal.expire = false;

    var startDate = Date.now();
    var increment = this.$el.find("#time-increment").val();
    data.deal.expiration = new Date(startDate + Number(increment)*1000);

    newDeal.save(data.deal, {
      success: function(model, response){
        model.attributes.transactions = [];
        thisView.deals.add(model);
        $("#active-deals-tab > a").trigger("click");
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
