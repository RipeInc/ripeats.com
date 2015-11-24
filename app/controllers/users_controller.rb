class UsersController < ApplicationController

  def index
  end

  def show
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
