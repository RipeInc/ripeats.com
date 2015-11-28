RipeCom.Views.CorporateMainView = Backbone.FusedView.extend({
  template: JST['corporate_main'],

  events: {

  },

  initialize: function(options){
    this.$corporateRoot = options.$corporateRoot;
    this.corporate = options.corporate;

    this.listenTo(this.corporate, "sync", this.render.bind(this));
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
