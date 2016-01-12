RipeCom.Views.LeaveRatingView = Backbone.FusedView.extend({
  template: JST['leave_rating'],
  className: 'ripe-modal',

  events: {
    "submit #new-rating-form": "submitRating",
    "click #modal-close-button": "closeModal",
  },

  initialize: function(options){
    this.corporateID = options.corporateID;
    this.userID = options.userID;
    this.corporateName = options.corporateName;

    this.rating = new RipeCom.Models.Rating();
    this.findPastRating();

    this.listenTo(this.rating, 'sync update change', this.render.bind(this));
  },

  findPastRating: function(){
    var thisView = this;

    $.ajax({
      url: "/api/ratings/exist/" + thisView.corporateID + "/" + thisView.userID,
      method: "GET",
      success: function(model, response){
        if(model.length >= 1){
          thisView.rating.parse(model[0]);
        }
      },
      error: function(){

      }
    })
  },

  render: function(){
    var content = this.template({
      rating: this.rating,
      corporateName: this.corporateName
    });
    this.$el.html(content);
    return this;
  },

  submitRating: function(event){
    event.preventDefault();
    var thisView = this;

    var data = this.$el.find("#new-rating-form").serializeJSON();
    data.rating.user_id = this.userID;
    data.rating.corporate_id = this.corporateID;

    this.rating.save(data, {
      success: function(model, response){
        thisView.rating.parse(model);
        thisView.closeModal();
      },

      error: function(model, response){
        debugger;
      }
    })
  },

  closeModal: function(event){
    if(event){ event.preventDefault(); };
    $("#ripe-overlay-field-master").html("");
    this.remove();
  }
})
