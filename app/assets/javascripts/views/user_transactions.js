RipeCom.Views.UserTransactions = Backbone.FusedView.extend({
  template: JST['user_transactions'],

  events: {
  },

  initialize: function(options){
    this.user = options.user;

    this.listenTo(this.user.transactions(), "sync update", this.render.bind(this));
  },

  isSearchView: function(){
    return false;
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
})
