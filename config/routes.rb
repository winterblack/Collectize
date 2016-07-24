Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :user, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :collections, only: [:create, :index, :update, :destroy]
    resources :characteristics, only: [:create, :destroy]
    resources :items, only: [:create, :index, :update, :destroy]
  end

  root "static_pages#root"
end
