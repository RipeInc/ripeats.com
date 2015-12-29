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
  end

  def destroy
    @deal = Deal.find(params[:id])
    @deal.destroy
    render json: @deal
  end

  private

  def deal_params
    params.require(:deal).permit(:corporate_id)
  end
end
