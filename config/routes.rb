Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :user, only: [:show, :create]

  namespace :api, defaults: { format: :json } do
    resources :user, only: [:show, :create]
  end
end
