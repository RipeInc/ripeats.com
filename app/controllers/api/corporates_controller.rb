class Api::CorporatesController < ApplicationController
  def show
    @corporate = Corporate.includes(:menu_items).includes(deals: :transactions).includes(:addresses).includes(:ratings).includes(transactions: :user).find(params[:id])
    if @corporate
      render "show"
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

  def edit
    @corporate = Corporate.find(params[:corporate_id]);
    if @corporate.update(corporate_params)
      render json: @corporate
    else
      render json: @corporate.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  private

  def corporate_params
    params.require(:corporate).permit(:id, :corporate_name, :description, :profile_image, :corporate_contact, :email, :password, :password_verify)
  end

end
