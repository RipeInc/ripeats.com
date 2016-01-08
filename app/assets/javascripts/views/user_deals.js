RipeCom.Views.UserDeals = Backbone.FusedView.extend({
  template: JST['user_deals'],

  events: {
    "click #search-deals": "searchDeals",
    "click #add-to-cart": "addToCart",
  },

  initialize: function(options){
    this.user = options.user;
    this.corporateDeals = options.corporateDeals;
    this.zip_code = options.zip_code;
    if(this.zip_code){ this.retrieveDeals(this.zip_code); };

    this.corporateDeals.reset();
    this.listenTo(this.corporateDeals, 'sync', this.render.bind(this));

    this.timeInterval = setInterval(this.displayDeals.bind(this), 1000);
  },

  isSearchView: function(){
    return true;
  },

  remove: function(){
    clearInterval(this.timeInterval);
  },

  addToCart: function(event){
    event.preventDefault();
    var thisView = this;

    var dealID = Number(event.currentTarget.dataset.id);
    var userID = Number(this.user.id);
    var newCartSelection = new RipeCom.Models.CartSelection();
    var data = {
      cart_selection: {
        deal_id: dealID,
        user_id: userID
      }
    }

    newCartSelection.save(data.cart_selection, {
      success: function(model, response){
        thisView.user.fetch();
        $("#user-cart-tab").trigger("click");
      },

      error: function(model, response){
        debugger;
      }
    })
  },

  searchDeals: function(event){
    if(event){ event.preventDefault(); };
    var thisView = this;

    var searchInput = this.$el.find("#search-input").val();
    thisView.zip_code = searchInput;

    thisView.corporateDeals.changeZip(Number(searchInput));

    $.ajax({
      url: "/api/search/" + searchInput,
      method: "GET",
      success: function(response){
        thisView.corporateDeals.reset();
        response.corporates.forEach(function(corporate){
          var newCorporate = new RipeCom.Models.Corporate({});
          newCorporate.parse(corporate);
          thisView.corporateDeals.add(newCorporate);
        });
        thisView.displayDeals();
      },

      error: function(response){
        debugger;
      }
    })

    // RAZYNOIR-INCOMPLETE: ZIP CODE CALCULATION
    // $.ajax({
    //   url: "https://www.zipcodeapi.com/iApFqR6HFg30bmtMkMGRqo5ak5qbXXjgyJVZA1GghJht6KfrxViXkn8FtyRrvaH4/radius.json/" + searchInput + "/5/km",
    //   method: "GET",
    //   success: function(response){
    //     debugger;
    //   },
    //
    //   error: function(response){
    //     debugger;
    //   }
    // })
  },

  retrieveDeals: function(zip_code){
    var thisView = this;

    var searchInput = zip_code;
    thisView.corporateDeals.changeZip(Number(searchInput));

    $.ajax({
      url: "/api/search/" + searchInput,
      method: "GET",
      success: function(response){
        thisView.corporateDeals.reset();
        response.corporates.forEach(function(corporate){
          var newCorporate = new RipeCom.Models.Corporate({});
          newCorporate.parse(corporate);
          thisView.corporateDeals.add(newCorporate);
        });
        thisView.displayDeals();
      },

      error: function(response){
        debugger;
      }
    })

    // RAZYNOIR-INCOMPLETE: ZIP CODE CALCULATION
    // $.ajax({
    //   url: "https://www.zipcodeapi.com/iApFqR6HFg30bmtMkMGRqo5ak5qbXXjgyJVZA1GghJht6KfrxViXkn8FtyRrvaH4/radius.json/" + searchInput + "/5/km",
    //   method: "GET",
    //   success: function(response){
    //     debugger;
    //   },
    //
    //   error: function(response){
    //     debugger;
    //   }
    // })
  },

  displayDeals: function(){
    var corporateDeals = this.corporateDeals;
    var $rootEl = this.$el.find("#deals-list-holder");
    $rootEl.html("");

    corporateDeals.forEach(function(corporate){
      var content = JST['corporate_and_deals']({
        corporate: corporate,
        deals: corporate.activeDeals()
      });
      $rootEl.append(content);
    })
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
})
