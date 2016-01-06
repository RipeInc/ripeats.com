RipeCom.Views.UserMainView = Backbone.FusedView.extend({
  template: JST['user_main'],

  events: {
    "click #signout-link": "signout"
  },

  initialize: function(options){
    this.$userRoot = options.$userRoot;
    this.user = options.user;

    this.addAllViews();
  },

  signout: function(event){
    event.preventDefault();

    $.ajax({
      url: "/api/sessions",
      method: "DELETE",
      success: function(response){
        window.location = "/";
      },

      error: function(response){
        debugger;
      }
    })
  },

  addAllViews: function(){
    this.addNavBarDashboard();
    this.addFooter();
  },

  addNavBarDashboard: function(){
    var $userNavBarDashboard = new RipeCom.Views.UserNavBarDashboard({
      user: this.user
    });

    this.addComponent($userNavBarDashboard, "#main-navbardashboard-field");
  },

  addFooter: function(){
    var $footer = new RipeCom.Views.FooterView();
    this.addComponent($footer, "#footer-field");
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    this.fusion();

    return this;
  }
})
