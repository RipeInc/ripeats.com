RipeCom.Routers.UserRouter = Backbone.Router.extend({
  routes: {

  },

  initialize: function(options){
    this.$userRoot = options.$userRoot;
    this.lastQuery = this.findLastQuery();

    if(!$("#user-info-header").html()){ return 0; };

    var data = $("#user-info-header").html().split("\n");
    var userID = Number(data[1].trim());
    this.user = new RipeCom.Models.User({
      id: userID
    });
    this.user.fetch();
    this.main();
  },

  findLastQuery: function(){
    var cookies = document.cookie.split(";");
    var lastQuery;
    for(var i = 0; i< cookies.length; i++){
      var cookie = cookies[i];
      var name = cookie.split("=")[0];
      if(name.substring(1, name.length) == "lastQuery"){
        lastQuery = cookie.split("=")[1];
        break;
      };
    };
    return lastQuery;
  },

  main: function(){
    var $userMainView = new RipeCom.Views.UserMainView({
      $userRoot: this.$userRoot,
      user: this.user,
      lastQuery: this.lastQuery
    });
    this._swap($userMainView);
  },

  _swap: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$userRoot.html(view.render().$el);
  }
})
