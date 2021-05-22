Rails.application.routes.draw do
    
  namespace :api do
    namespace :v1 do
      get '/stores', to: "store#index"
      post '/stores/', to: "store#create"
      get '/stores/:id', to: "store#show"
      get 'store/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
        resource :users, only: [:create]
        post "login", to: "users#login"
        get "auto_login", to: "users#auto_login"
    end
  end


  namespace :api do
    namespace :v1 do
      get '/categories/:category_id/brands/', to: 'brand#index'
      post '/categories/:category_id/brands/', to: 'brand#create'
      get '/brands/:id', to: 'brand#show'
      put 'brands/:id', to: 'brand#update'
      delete 'brands/:id', to: 'brand#destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'categories/', to: 'category#index'
      post 'categories/', to: 'category#create'
      get 'categories/:id', to: 'category#show'
      put 'categories/:id', to: 'category#update'
      delete 'categories/:id', to: 'category#destroy'
    end
  end
  root 'landing_page#index'
  get '*path' => 'landing_page#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
