window.RipeCom = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    window.noticeVisual = true;
    new RipeCom.Routers.Router({
      $rootEl: $()
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  RipeCom.initialize();
});
