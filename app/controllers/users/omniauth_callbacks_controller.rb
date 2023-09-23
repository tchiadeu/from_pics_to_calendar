class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    if auth.info.email == 'contact@kevintchiadeu.com'
      user = User.from_omniauth(auth)
      if user.present?
        sign_out_all_scopes
        sign_in_and_redirect user, event: :authentication
      end
    else
      redirect_to new_user_registration_path
    end
  end

  private

  def auth
    @auth ||= request.env['omniauth.auth']
  end
end
