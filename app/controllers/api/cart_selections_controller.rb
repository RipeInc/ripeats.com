class Api::CartSelectionsController < ApplicationController

  def create
    @cart_selection = CartSelection.new(cart_selection_params)
    if @cart_selection.save
      render json: @cart_selection
    else
      render json: @cart_selection.errors.full_messages
    end
  end

  def destroy
    @cart_selection = CartSelection.find(params[:id])
    @cart_selection.destroy
    render json: @cart_selection
  end

  private

  def cart_selection_params
    params.require(:cart_selection).permit(:user_id, :deal_id)
  end

end
