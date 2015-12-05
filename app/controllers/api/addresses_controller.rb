class Api::AddressesController < ApplicationController

  def corporate_address
    @corporate = Corporate.includes(:addresses).find(params[:corporate_id]);
    @addresses = @corporate.addresses
    render json: @addresses
  end

  def user_address
    @user = User.includes(:addresses).find(params[:user_id]);
    @addresses = @user.addresses
    render json: @addresses
  end

  private

  def address_params
    params.require(:address).permit(:corporate_id, :user_id)
  end
end
