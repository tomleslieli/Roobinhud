Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :users, only: [:create]
    resources :stocks, only: [:show, :create, :update]
    resources :portfolios, only: [:show, :create, :update]
    resources :watchlists, only: [:show, :create, :destroy]

    resource :session, only: [:create, :destroy, :show]
  end
  root to: 'static_pages#root'
end
