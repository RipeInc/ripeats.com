class CorporatesController < ApplicationController
  before_action :bounce_back_if_not_logged_in, only: [:index, :show]

  def index
  end

  def show
    @corporate = Corporate.find(params[:id])
    render :show
  end

  private

  def corporate_params
    params.require(:corporate).permit(:corporate_name, :email, :password, :password_verify)
  end
end
