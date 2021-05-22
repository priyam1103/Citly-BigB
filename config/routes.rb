Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :urls, only: [:index, :create, :update, :destroy]
  get '/:id', to: 'urls#show'
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
