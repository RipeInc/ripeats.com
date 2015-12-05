RipeCom.Models.MenuItem = Backbone.Model.extend({
  urlRoot: "api/menu_items",

  parse: function(response){
    this.set(response);
  }
})
