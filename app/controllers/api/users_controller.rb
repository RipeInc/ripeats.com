class Api::UsersController < ApplicationController

  def search
    @zip_code = params[:zip_code]
    # RAZYNOIR-INCOMPLETE: NO ZIP CODE SEARCH

    @corporates = Corporate.includes(:deals).includes(:ratings).includes(:transactions).all
    render "search"
  end

  def show
    @user = User.includes(:ratings).includes(:transactions).includes(:addresses).find(params[:id])
    if @user
      render "show"
    else
      render json: "User not found.", status: 404
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in!(@user)
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