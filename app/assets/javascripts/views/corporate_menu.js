RipeCom.Views.CorporateMenu = Backbone.FusedView.extend({
  template: JST['corporate_menu'],

  events: {

  },

  initialize: function(options){

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
