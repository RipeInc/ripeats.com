class CorporatesController < ApplicationController
  def index
  end

  def show
    render :show
  end

  def create
    @corporate = Corporate.new(corporate_params)
    if @corporate.save
      log_in_corporate!(@corporate)
      render json: @corporate
    else
      render json: @corporate.errors.full_messages, status: :unprocessible_entity
    end
  end

  def edit
  end

  def delete
  end

  private

  def corporate_params
    params.require(:corporate).permit(:corporate_name, :email, :password, :password_verify)
  end
end
