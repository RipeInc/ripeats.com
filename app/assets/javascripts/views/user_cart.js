RipeCom.Views.UserCart = Backbone.FusedView.extend({
  template: JST['user_cart'],

  events: {
    "click #remove-from-cart": "removeDeal"
  },

  initialize: function(options){
    this.user = options.user;

    this.listenTo(this.user.dealSelections(), 'sync update', this.render.bind(this));
  },

  removeDeal: function(event){
    event.preventDefault();
    var thisView = this;
    var selectionID = Number(event.currentTarget.dataset.id);

    $.ajax({
      url: "/api/cart_selections/" + selectionID,
      method: "DELETE",
      success: function(model, response){
        var model = thisView.user.dealSelections().findWhere({cart_selection_id: selectionID});
        thisView.user.dealSelections().remove(model);
      },

      error: function(model, response){
        debugger;
      }
    });
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
})
