RipeCom.Views.CorporateAccountInfo = Backbone.FusedView.extend({
  template: JST['corporate_account'],

  events: {

  },

  initialize: function(options){
    this.corporate = options.corporate;
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate
    });
    this.$el.html(content);
    return this;
  }
})
