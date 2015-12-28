class Api::MenuItemsController < ApplicationController

  def create
    @menu_item = MenuItem.new(menu_item_params)
    if @menu_item.save
      render json: @menu_item
    else
      render json: @menu_item.errors.full_messages, status: 433
    end
  end

  def destroy
    @menu_item = MenuItem.find(params[:id])
    @menu_item.destroy
    render json: @menu_item
  end

  private

  def menu_item_params
    params.require(:menu_item).permit(:item_name, :description,:corporate_id, :item_image, :price)
  end
end
