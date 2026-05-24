Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contacts, only: [:create]
      resources :partnerships, only: [:create]
      resources :songs, only: [:index]
    end
  end
end
