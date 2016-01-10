class UsersController < ApplicationController
  before_action :check_current_user, only: [:show]

  def check_current_user
    @user = User.find(params[:id])
    if current_user != @user
      render json: "You can't view other user's account.", status: 403
    elsif !current_user
      redirect_to root_url
    end
  end

  def index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessible_entity
    end
  end

  def edit
  end

  def delete
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_verify)
  end
end
