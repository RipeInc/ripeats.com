RipeCom.Views.UserDeals = Backbone.FusedView.extend({
  template: JST['user_deals'],

  events: {
    "submit #search-input-form": "searchDeals",
    "click #add-to-cart": "addToCart",
    "click #corporate-avatar-holder": "showCorporateInfo",
    "click #corporate-title": "showCorporateInfo",
  },

  initialize: function(options){
    this.user = options.user;
    this.corporateDeals = options.corporateDeals;
    this.zip_code = options.zip_code;

    if(this.zip_code){ this.retrieveDeals(this.zip_code); };
    if(options.lastQuery){ this.retrieveDeals(options.lastQuery); };

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

  showCorporateInfo: function(event){
    event.preventDefault();
    var corporateID = Number(event.currentTarget.dataset.corporateId);
    var corporateToShow = new RipeCom.Models.Corporate({
      id: corporateID
    });
    corporateToShow.fetch();
    var newSummaryView = new RipeCom.Views.CorporateSummaryView({
      corporate: corporateToShow
    });
    var $modalField = $("#ripe-overlay-field-master");
    $modalField.html(newSummaryView.render().$el);
    window.scrollTo(0, 0);
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

    RipeCom.Utils.setCookie("lastQuery", searchInput);
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

    if(corporateDeals.length > 0){
      corporateDeals.forEach(function(corporate){
        var content;

        if(corporate.activeDeals().length < 1){
          content = ""
        }else{
          content = JST['corporate_and_deals']({
            corporate: corporate,
            deals: corporate.activeDeals()
          });
        };

        $rootEl.append(content);
      });
    }else{
      var content = JST['no-deals']({});
      $rootEl.html(content);
    }
  },

  render: function(){
    var content = this.template({
      user: this.user,
      zip_code: this.zip_code
    });
    this.$el.html(content);
    return this;
  }
})
