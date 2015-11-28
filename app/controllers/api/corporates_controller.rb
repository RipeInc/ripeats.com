class Api::CorporatesController < ApplicationController
  def show
    @corporate = Corporate.find(params[:id])
    if @corporate
      render json: @corporate
    else
      render json: "Corporate not found.", status: 500
    end
  end

  def create
    @corporate = Corporate.new(corporate_params)

    if @corporate.save
      log_in_corporate!(@corporate)
      render json: @corporate
    else
      render json: @corporate.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  private

  def corporate_params
    params.require(:corporate).permit(:corporate_name, :email, :password, :password_verify)
  end

end
