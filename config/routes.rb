Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:show, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create]
  end
end
