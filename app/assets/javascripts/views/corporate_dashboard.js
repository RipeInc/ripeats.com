RipeCom.Views.CorporateDashboard = Backbone.FusedView.extend({
  template: JST['corporate_dashboard'],

  events: {
    "click #corporate-info-tab": "showAccount",
    "click #menu-tab": "showMenu",
    "click #active-deals-tab": "showDeals",
    "click #past-transactions-tab": "showTransactions",
  },

  initialize: function(options){
    this.corporate = options.corporate;
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate
    });
    this.$el.html(content);
    return this;
  },

  showAccount: function(event){
    event.preventDefault();
    var newView = new RipeCom.Views.CorporateAccountInfo({
      corporate: this.corporate
    });
    this._swap(newView);
  },

  showMenu: function(event){
    event.preventDefault();
    var newView = new RipeCom.Views.CorporateMenu({
      corporate: this.corporate
    });
    this._swap(newView);
  },

  showDeals: function(event){
    event.preventDefault();
    var newView = new RipeCom.Views.CorporateDeals({
      corporate: this.corporate
    });
    this._swap(newView);
  },

  showTransactions: function(event){
    event.preventDefault();
    var newView = new RipeCom.Views.CorporatePastTransactions({
      corporate: this.corporate
    });
    this._swap(newView);
  },

  _swap: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$el.find("#corporate-tab-field-main").html(newView.render().$el);
  }


})
