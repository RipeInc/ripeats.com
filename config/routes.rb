Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:show, :create]
  resources :corporates, only: [:show]

  namespace :api, defaults: { format: :json } do
    resources :corporates, only: [:show, :create, :destroy] do
      resources :menu_items, only: [:index]
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
