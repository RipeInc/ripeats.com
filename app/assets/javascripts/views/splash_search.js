RipeCom.Views.SplashSearch = Backbone.FusedView.extend({
  template: JST['main_search'],
  className: 'splash-main',

  events: {
    "submit #splash-search-form": "searchSplash"
  },

  initialize: function(options){

  },

  changeMessage: function(){
    this.current += 1;
    if(this.lastMessage){ this.lastMessage.remove() };
    var $newMessage = $("<h1>").addClass("message-board")
                             .html(this.messages[this.current % 3]);
    this.$el.find(".message-board-holder").append($newMessage);
    setInterval(function(){ $newMessage.css("opacity", "1")}, 1);
    this.lastMessage = $newMessage;
  },

  searchSplash: function(event){
    event.preventDefault();

    var data = this.$el.find("#splash-search-form").serializeJSON();

    $.ajax({
      url: "/api/splash_search/" + data.search,
      method: "GET",
      success: function(model, response){
        RipeCom.Utils.setCookie("lastQuery", data.search);
        RipeCom.Utils.setCookie("session_token", model.session_token);
        // document.cookie = "session_token=" + model.session_token + "; path=/";
        // document.cookie = "lastQuery=" + Number(data.search);
        window.location = "/";
      },

      error: function(model, response){

      }
    })
  },

  setBoardChange: function(){
    this.current = this.current || 2;
    this.messages = [
      "Are You Hungry?",
      "Want to be Sustainable?",
      "Looking for Good Deals?"
    ];
    this.lastMessage = null;
    this.changeMessage();
    this.changeInterval = setInterval(this.changeMessage.bind(this), 5000);
  },

  remove: function(){
    clearInterval(this.changeInterval);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.setBoardChange();

    this.fusion();

    return this;
  }
})
