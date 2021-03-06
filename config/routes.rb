Rails.application.routes.draw do
  root to: "static_pages#index"
  get "/mission", to: "static_pages#mission"

  resources :users, only: [:show, :create]
  resources :corporates, only: [:show]

  post "/corporates/api/menu_items", to: "api/menu_items#create"
  delete "/corporates/api/menu_items/:id", to: "api/menu_items#destroy"
  put "/api/deals/:id", to: "api/deals#edit"

  namespace :api, defaults: { format: :json } do
    get "/search/:zip_code", to: "users#search"
    put "/address/:id", to: "addresses#update"
    post "/address", to: "addresses#create"
    get "/splash_search/:zip_code", to: "users#splash_search"
    get "/ratings/exist/:corporate_id/:user_id", to: "ratings#check"
    resources :ratings, only: [:create, :update]

    resources :deals, only: [:create, :destroy]
    resources :cart_selections, only: [:create, :destroy]
    resources :users, only: [:show] do
      get "/cart", to: "users#cart"
    end

    resources :bundlings, only: [:destroy]
    resources :transactions, only: [:create]

    resources :corporates, only: [:show, :create, :destroy] do
      resources :menu_items, only: [:index]
      put '', to: "corporates#edit"
      get '/active_deals', to: "deals#active_deals"
      get '/expired_deals', to: "deals#expired_deals"
      get '/ratings', to: "ratings#corporate_ratings"
      get '/transactions', to: "transactions#corporate_transactions"
      get '/addresses', to: "addresses#corporate_address"
    end

    resources :users, only: [:show, :create, :destroy] do
      get '/ratings', to: "ratings#user_ratings"
      get '/transactions', to: "transactions#user_transactions"
      get '/addresses', to: "addresses#user_address"
    end

    resource :sessions, only: [:create, :destroy]
  end
end
