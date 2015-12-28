RipeCom.Views.CorporateMenu = Backbone.FusedView.extend({
  template: JST['corporate_menu'],

  events: {
    "click #add-new-menu-item": "createNewItem",
    "click .delete-menu-item": "deleteItem",
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.menuItems = this.corporate.menuItems();
    this.listenTo(this.corporate, 'sync', this.updateRender);
    this.listenTo(this.menuItems, 'sync update', this.updateRender);
  },

  updateRender: function(){
    this.menuItems = this.corporate.menuItems();
    this.render();
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

  render: function(){
    debugger;
    var content = this.template({
      corporate: this.corporate,
      menuItems: this.menuItems
    });
    this.$el.html(content);
    return this;
  }
})
