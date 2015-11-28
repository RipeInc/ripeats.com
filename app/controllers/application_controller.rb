class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :current_corporate

  def log_in!(user)
    session[:session_token] = user.reset_session_token!
  end

  def log_in_corporate!(corporate)
    session[:session_token] = corporate.reset_session_token!
  end

  def log_out!
    session[:session_token] = nil
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def current_corporate
    @current_corporate ||= Corporate.find_by_session_token(session[:session_token])
  end

  def redirect_home_if_logged_in
    if current_user
      redirect_to user_url(current_user)
    end
    if current_corporate
      redirect_to corporate_url(current_corporate)
    end
  end

  def bounce_back_if_not_logged_in
    if !current_user && !current_corporate
      redirect_to root_url
    end
  end
end
