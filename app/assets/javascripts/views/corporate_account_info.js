RipeCom.Views.CorporateAccountInfo = Backbone.FusedView.extend({
  template: JST['corporate_account'],

  events: {
    "click #change-corporate-avatar": "changeAvatar",
    "click #change-corporate-description": "changeDescription",
    "click #change-corporate-contact": "changeContact",
    "click #corporate-change-address": "changeAddress",
    "click #corporate-add-address": "addAddress",
  },

  initialize: function(options){
    this.corporate = options.corporate;

    this.listenTo(this.corporate, 'sync', this.render.bind(this));
    this.listenTo(this.corporate.address(), 'sync', this.render.bind(this));
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
  },

  changeDescription: function(event){

  },

  changeContact: function(event){

  },

  addAddress: function(event){

  },

  changeAddress: function(event){
    event.preventDefault();
    var $modalField = $("#ripe-overlay-field-master");
    var newModalView = new RipeCom.Views.CorporateChangeAddress({
      corporate: this.corporate,
      address: this.corporate.address()
    });

    $modalField.html(newModalView.render().$el);
  }
})
