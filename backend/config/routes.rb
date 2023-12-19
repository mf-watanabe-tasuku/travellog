Rails.application.routes.draw do
  get 'sessions/new'
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :eyecatches, only: %i[ create destroy ]
      resources :posts do
        collection do
          get :count
          get :me
        end
      end
      namespace :auth do
        get '/user', to: 'users#user'
        post '/register', to: 'users#create'
        post '/login', to: 'sessions#create'
        delete '/logout', to: 'sessions#destroy'
      end
    end
  end
end
