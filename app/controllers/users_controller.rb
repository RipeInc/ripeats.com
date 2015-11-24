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
      redirect_to user_url(@user)
    else
      render json: @user.errors.full_messages
    end
  end

  def edit

  end

  def delet
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
