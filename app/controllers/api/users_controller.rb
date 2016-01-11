class Api::UsersController < ApplicationController

  def search
    @zip_code = params[:zip_code]
    # RAZYNOIR-INCOMPLETE: NO ZIP CODE SEARCH
    # p RipeCom::Application::ALL_NEAR_ZIP(@zip_code)
    @near_zips = RipeCom::Application::ALL_NEAR_ZIP(@zip_code)
    @zip_hash = {}
    @near_zips.each do |zip|
      @zip_hash[zip] = true
    end
    p @near_zips

    @corporates = Corporate.includes(:addresses).includes(:deals).includes(:ratings).includes(:transactions).all
    render "search"
  end

  def splash_search
    @zip_code = params[:zip_code]
    usernum = (1 + rand(9999)).to_s
    password_string = SecureRandom.urlsafe_base64
    @user = User.new(username: "Guest " + usernum, email: password_string + "@ripeats.com", password: password_string, password_verify: password_string);

    if @user.save
      log_in!(@user)
      render json: @user
    else
      render json: "Guest account creation failed.", status: 422
    end
  end

  def cart
    @user = User.find(params[:user_id])
    @deal_selections = @user.deal_selections
    render "cart"
  end

  def show
    @user = User.includes(:ratings).includes(transactions: {bundlings: {deal: :corporate}}).includes(cart_selections: {deal: :corporate}).includes(:addresses).find(params[:id])
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
