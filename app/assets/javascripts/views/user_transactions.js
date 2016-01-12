RipeCom.Views.UserTransactions = Backbone.FusedView.extend({
  template: JST['user_transactions'],

  events: {
    "click #leave-a-rating": "leaveRating"
  },

  initialize: function(options){
    this.user = options.user;

    this.listenTo(this.user.transactions(), "sync update", this.render.bind(this));
  },

  isSearchView: function(){
    return false;
  },

  leaveRating: function(event){
    event.preventDefault();
    var thisView = this;
    var corporateID = Number(event.currentTarget.dataset.corporateId);
    var corporateName = event.currentTarget.dataset.corporateName;

    var $modalField = $("#ripe-overlay-field-master");
    var newView = new RipeCom.Views.LeaveRatingView({
      corporateID: corporateID,
      corporateName: corporateName,
      userID: thisView.user.id
    });
    $modalField.html(newView.render().$el);
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
})
