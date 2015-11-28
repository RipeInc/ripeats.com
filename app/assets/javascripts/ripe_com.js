window.RipeCom = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    window.noticeVisual = true;

    new RipeCom.Routers.Router({
      $rootEl: $('#splash-page-backbone-field'),
      $footerEl: $('#splash-page-footer-field')
    });
    
    new RipeCom.Routers.CorporateRouter({
      $corporateRoot: $("#corporate-page-backbone-field")
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  RipeCom.initialize();
});
