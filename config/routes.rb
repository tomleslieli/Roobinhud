Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resources :portfolios, only: [:index, :create, :update]
    resources :watchlists, only: [:index, :create, :destroy]

    resource :session, only: [:create, :destroy, :show]
  end
  root to: 'static_pages#root'
end