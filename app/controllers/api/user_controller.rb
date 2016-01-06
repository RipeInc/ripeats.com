class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:ratings).includes(:transactions).includes(:addresses)
    if @user
      render "show"
    else
      render json: "User not found.", status: 404
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in_user!(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def edit
    @user = User.find(params[:user_id]);
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_verify)
  end
end
