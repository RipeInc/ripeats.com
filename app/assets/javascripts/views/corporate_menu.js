RipeCom.Views.CorporateMenu = Backbone.FusedView.extend({
  template: JST['corporate_menu'],

  events: {
    "click #add-new-menu-item": "createNewItem",
    "click .delete-menu-item": "deleteItem",
    "click .post-deal": "postDeal",
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.menuItems = this.corporate.menuItems();
    this.check = {};

    this.listenTo(this.corporate, 'sync', this.updateRender.bind(this));
    this.listenTo(this.menuItems, 'sync update', this.updateRender.bind(this));
    this.listenTo(this.corporate.activeDeals(), 'sync update change', this.updateRender.bind(this));
  },

  updateRender: function(){
    var thisView = this;
    thisView.menuItems = thisView.corporate.menuItems();
    thisView.corporate.attributes.active_deals.forEach(function(deal){
      thisView.check[deal.menu_item_id] = true;
    });
    thisView.render();
  },

  createNewItem: function(event){
    event.preventDefault();

    var $modalField = $("#ripe-overlay-field-master");
    var newView = new RipeCom.Views.CorporateNewMenuItem({
      corporate: this.corporate
    });
    $modalField.html(newView.render().$el);
  },

  deleteItem: function(event){
    event.preventDefault();
    var deleteID = event.currentTarget.dataset.itemid;
    var thisView = this;

    var itemToDelete = this.menuItems.where({id: Number(deleteID)})[0];

    if(itemToDelete){
      itemToDelete.destroy({
        success: function(model, response){
          thisView.menuItems.remove(deleteID);
        }
      });
    }
  },

  postDeal: function(event){
    event.preventDefault();

    if(this.corporate.attributes.addresses.length < 1){
      RipeCom.Utils.insertErrorMessages(["You need to add your address to post a deal. Please go to 'My Account' to add an address."]);
      return;
    }

    var itemID = Number(event.currentTarget.dataset.itemid);
    if(this.check[itemID]){
      RipeCom.Utils.insertErrorMessages(["This menu item has an active deal outstanding! Go to 'Active Deals' to view the deal!"])
      return;
    }

    var thisView = this;

    var itemToPost = this.menuItems.where({id: itemID})[0];

    var $modalField = $("#ripe-overlay-field-master");
    var newView = new RipeCom.Views.CorporatePostDeal({
      corporate: this.corporate,
      menuItem: itemToPost
    });
    $modalField.html(newView.render().$el);
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate,
      menuItems: this.menuItems
    });
    this.$el.html(content);
    return this;
  }
})
