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

  def create
    @address = Address.new(address_params)
    if @address.save
      render json: @address
    else
      render json: @address.errors.full_messages, status: 422
    end
  end

  def update
    @address = Address.find(params[:id])
    if @address.update(address_params)
      render json: @address
    else
      render json: @address.errors.full_messages
    end
  end

  private

  def address_params
    params.require(:address).permit(:locatable_id, :locatable_type, :corporate_id, :user_id, :street_one, :street_two, :city, :state, :zip_code)
  end
end
