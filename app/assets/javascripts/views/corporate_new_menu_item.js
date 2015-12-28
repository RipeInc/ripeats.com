RipeCom.Views.CorporateNewMenuItem = Backbone.FusedView.extend({
  template: JST['corporate_new_menu_item'],
  className: "ripe-modal",

  events: {
    "click #newImage": "addImage",
    "submit #corporate-new-menu-item-form": "createNewItem",
    "click #modal-close-button": "closeModal"
  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.image_url = undefined;
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate
    });

    this.$el.html(content);
    return this;
  },

  addImage: function(event){
    event.preventDefault();
    var thisView = this;

    filepicker.setKey("A8wUZft6SyCY63HWqMYIFz");
    filepicker.pick(
      {
        cropRatio: 1,
        mimetype: 'image/*',
        services: ['COMPUTER', 'CONVERT'],
        cropForce: true
      },

      function(result){
        thisView.image_url = result.url;
        var $imagePreview = thisView.$el.find("#image-preview")[0];
        $imagePreview.src = thisView.image_url;
      },

      function(error){
        debugger;
      }
    );
  },

  createNewItem: function(event){
    event.preventDefault();
    var thisView = this;

    var data = $("#corporate-new-menu-item-form").serializeJSON();
    var newItem = new RipeCom.Models.MenuItem();
    data.menu_item.corporate_id = this.corporate.id;
    data.menu_item.item_image = this.image_url;
    data.menu_item.price = Number(data.menu_item.price)*100;
    debugger;

    newItem.save(data.menu_item, {
      success: function(model, response){
        thisView.corporate.menuItems().add(model);
        thisView.closeModal();
      },

      error: function(model, response){
        debugger;
      }
    });
  },

  closeModal: function(event){
    if(event){ event.preventDefault(); };
    $("#ripe-overlay-field-master").html("");
    this.remove();
  }
})
