Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:show, :create]
  resources :corporates, only: [:show, :create]

  namespace :api, defaults: { format: :json } do
    resources :corporates, only: [:show]
    resource :sessions, only: [:create, :destroy]
  end
end
