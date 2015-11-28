RipeCom.Views.CorporateMainView = Backbone.FusedView.extend({
  template: JST['corporate_main'],

  events: {
    "click #signout-link": "signout"
  },

  initialize: function(options){
    this.$corporateRoot = options.$corporateRoot;
    this.corporate = options.corporate;

    this.listenTo(this.corporate, "sync", this.render.bind(this));

    this.addAllViews();
  },

  signout: function(event){
    event.preventDefault();

    $.ajax({
      url: "/api/sessions",
      method: "DELETE",
      success: function(response){
        window.location = "/"
      },
      error: function(response){
        debugger;
      }
    })
  },

  addAllViews: function(){
    this.addNavBar();
    this.addInfoSection();
    this.addDashboard();
    this.addFooter();
  },

  addNavBar: function(){
    var $navBar = new RipeCom.Views.NavBar({
      entity: this.corporate
    });
    this.addComponent($navBar, "#main-navbar-field");
  },

  addInfoSection: function(){
    var $infoSection = new RipeCom.Views.CorporateInfo({
      corporate: this.corporate
    });
    this.addComponent($infoSection, "#corporate-info-field");
  },

  addDashboard: function(){
    var $dashboard = new RipeCom.Views.CorporateDashboard({
      corporate: this.corporate
    });
    this.addComponent($dashboard, "#corporate-dashboard-field");
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
