RipeCom.Views.UserCart = Backbone.FusedView.extend({
  template: JST['user_cart'],

  events: {
    "click #remove-deal": "removeDeal"
  },

  initialize: function(options){
    this.user = options.user;

    this.listenTo(this.user.dealSelections(), 'sync', this.render.bind(this));
  },

  removeDeal: function(event){
    event.preventDefault();
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
})
