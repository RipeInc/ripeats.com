RipeCom.Views.CorporateAccountInfo = Backbone.FusedView.extend({
  template: JST['corporate_account'],

  events: {
    "click #change-corporate-avatar": "changeAvatar"
  },

  initialize: function(options){
    this.corporate = options.corporate;

    this.listenTo(this.corporate, 'sync', this.render.bind(this));
  },

  render: function(){
    var content = this.template({
      corporate: this.corporate
    });
    this.$el.html(content);
    return this;
  },

  changeAvatar: function(event){
    event.preventDefault();
    var thisView = this;
    filepicker.setKey("A8wUZft6SyCY63HWqMYIFz");
    filepicker.pick(
      {
        cropRatio: 1,
        mimetype: 'image/*',
        services: ['COMPUTER', 'CONVERT'],
        cropForce: true
      },

      function(result){
        var data = {"profile_image": result.url};
        thisView.corporate.save(data, {
          success: function(model, response){
            thisView.corporate.fetch();
          },

          error: function(model, response){
            debugger;
          }
        })
      },

      function(error){
        debugger;
      }
    );
  }
})
