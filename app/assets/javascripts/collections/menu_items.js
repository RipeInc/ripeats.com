RipeCom.Collections.MenuItems = Backbone.Collection.extend({
  url: function(){
    return "api/corporate/" + this.corporate.id + "/menu_items";
  },

  model: RipeCom.Models.MenuItem,

  initialize: function(options){
    this.corporate = options.corporate;
  },

  parse: function(response){
    this.set(response);
  }
})
