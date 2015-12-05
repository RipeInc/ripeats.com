RipeCom.Views.CorporateMenu = Backbone.FusedView.extend({
  template: JST['corporate_menu'],

  events: {

  },

  initialize: function(options){
    this.corporate = options.corporate;
    this.menuItems = this.corporate.menuItems();
    this.listenTo(this.corporate, 'sync', this.updateRender);
  },

  updateRender: function(){
    this.menuItems = this.corporate.menuItems();
    this.render();
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
