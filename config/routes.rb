Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :collections, only: [:index, :create]
  end

  root "static_pages#root"
end
