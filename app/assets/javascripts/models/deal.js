RipeCom.Models.Deal = Backbone.Model.extend({
  urlRoot: "/api/deals",

  transactions: function(){
    if(!this._transactions){
      this._transactions = new RipeCom.Collections.DealTransactions({
        deal: this
      });
    };
    return this._transactions;
  },

  parse: function(response){
    var thisModel = this;

    thisModel.set(response);
    if(response.transactions){
      this.transactions().parse(response.transactions);
      delete response.transactions;
    }

    return response;
  },

  sold: function(){
    return this.transactions().length;
  },

  left: function(){
    return this.attributes.quantity - this.transactions().length;
  },

  timeLeft: function(){
    var thisModel = this;
    var secondsLeft = Math.floor((Date.parse(this.attributes.expiration) - Date.now())/1000);

    if(secondsLeft <= 0){
      thisModel.save({deal: {expire: true}}, {
        success: function(model, response){

        }
      })
      return 0;
    };

    var hoursLeft = Math.floor(secondsLeft / 3600);
    var minutesLeft = Math.floor((secondsLeft - 3600*hoursLeft)/60);
    var secondsLeft = secondsLeft - hoursLeft*3600 - minutesLeft*60;

    var pad = "00";
    var hoursLeft = pad.substring(0, pad.length - String(hoursLeft).length) + String(hoursLeft);
    var minutesLeft = pad.substring(0, pad.length - String(minutesLeft).length) + String(minutesLeft);
    var secondsLeft = pad.substring(0, pad.length - String(secondsLeft).length) + String(secondsLeft);

    return hoursLeft + ":" + minutesLeft + ":" + secondsLeft;
  },

  currentPrice: function(){
    if(this.attributes.created_at){
      this.attributes.time_start = this.attributes.created_at;
    }

    var pStart = this.attributes.price;
    var pEnd = this.attributes.least_price;
    var t = Math.floor(Date.now()/60000);
    var tEndMinusTStart = Math.floor((Date.parse(this.attributes.expiration) - Date.parse(this.attributes.time_start))/60000);
    var tMinusTStart = Math.floor((Date.now() - Date.parse(this.attributes.time_start))/60000);

    var currentPrice = ((pEnd - pStart)*tMinusTStart)/tEndMinusTStart + pStart

    return Math.floor(currentPrice);
  }
})
