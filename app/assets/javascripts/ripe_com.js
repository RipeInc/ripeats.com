window.RipeCom = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    window.noticeVisual = true;
    new RipeCom.Routers.Router({
      $rootEl: $('#splash-page-backbone-field')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  RipeCom.initialize();
});
