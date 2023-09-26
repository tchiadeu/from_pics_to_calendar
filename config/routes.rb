Rails.application.routes.draw do
  root 'pages#home'
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  get 'new_file', to: 'pages#new_file'
  post 'upload', to: 'pages#upload'
  get 'new_event', to: 'pages#new_event'
  post 'create_event', to: 'pages#create_event'
  get 'callback', to: 'pages#callback', as: 'callback'
  resources 'photos', only: %i[new create]
end
