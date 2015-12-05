RipeCom.Views.CorporateAccountInfo = Backbone.FusedView.extend({
  template: JST['corporate_account'],

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
