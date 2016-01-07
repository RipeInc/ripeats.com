class Api::DealsController < ApplicationController

  def active_deals
    @corporate = Corporate.includes(:deals).find(params[:corporate_id])
    @active_deals = @corporate.deals.where(expire: false)
    render json: @active_deals
  end

  def expired_deals
    @corporate = Corporate.includes(:deals).find(params[:corporate_id])
    @expired_deals = @corporate.deals.where(expire: true)
    render json: @expired_deals
  end

  def create
    @deal = Deal.new(deal_params)
    if @deal.save
      render json: @deal
    else
      render json: @deal.errors.full_messages, status: 422
    end
  end

  def edit
    @deal = Deal.find(params[:id])
    if @deal.update(deal_params)
      render json: @deal
    else
      render json: @deal.errors.full_messages, status: 422
    end
  end

  def destroy
    @deal = Deal.find(params[:id])
    @deal.destroy
    render json: @deal
  end

  private

  def deal_params
    params.require(:deal).permit(:corporate_id, :deal_title, :description, :deal_image, :quantity, :original_price, :price, :least_price, :expire, :expiration)
  end
end
