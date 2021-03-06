RipeCom.Views.CorporateInfo = Backbone.FusedView.extend({
  template: JST['corporate_info'],

  events: {

  },

  initialize: function(options){
    this.corporate = options.corporate;

    this.listenTo(this.corporate, "sync", this.render.bind(this));
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate
    });
    this.$el.html(content);
    return this;
  }
})
