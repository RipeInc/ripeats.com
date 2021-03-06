RipeCom.Views.UserCart = Backbone.FusedView.extend({
  template: JST['user_cart'],

  events: {
    "click #remove-from-cart": "removeDeal",
    "click #checkout": "checkout"
  },

  initialize: function(options){
    this.user = options.user;

    this.listenTo(this.user.dealSelections(), 'sync update', this.render.bind(this));

    this.timeInterval = setInterval(this.render.bind(this), 1000);
  },

  isSearchView: function(){
    return false;
  },

  remove: function(){
    clearInterval(this.timeInterval);
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
        var models = thisView.user.attributes.deal_selections
        for(var i = 0; i< models.length; i++){
          var selection = models[i];
          if(selection.cart_selection_id == selectionID){
            models.splice(i, 1);
          };
        };
        thisView.user.dealSelections().remove(model);
      },

      error: function(model, response){
        debugger;
      }
    });
  },

  checkout: function(event){
    event.preventDefault();

    var $modalField = $("#ripe-overlay-field-master");
    var newView = new RipeCom.Views.UserCheckout({
      user: this.user,
      deals: this.user.dealSelections(),
      cartView: this
    });
    $modalField.html(newView.render().$el);
    window.scrollTo(0, 0);
  },

  clearCarts: function(){
    var thisView = this;
    thisView.user.dealSelections().forEach(function(deal){
      var selectionID = deal.attributes.cart_selection_id;
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
    })
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
})
