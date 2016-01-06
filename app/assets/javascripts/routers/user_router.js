RipeCom.Routers.UserRouter = Backbone.Router.extend({
  routes: {

  },

  initialize: function(options){
    this.$userRoot = options.$userRoot;

    if(!$("#user-info-header").html()){ return 0; };

    var data = $("#user-info-header").html().split("\n");
    var userID = Number(data[1].trim());
    this.user = new RipeCom.Models.User({
      id: userID
    });
    this.user.fetch();

    this.main();
  },

  main: function(){
    var $userMainView = new RipeCom.Views.UserMainView({
      $userRoot: this.$userRoot,
      user: this.user
    });
    this._swap($userMainView);
  },

  _swap: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$userRoot.html(view.render().$el);
  }
})
