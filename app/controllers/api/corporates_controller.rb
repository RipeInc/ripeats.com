require 'net/http'
require 'json'

class Api::CorporatesController < ApplicationController
  def show
    @corporate = Corporate.includes(:menu_items).includes(deals: {transactions: :user}).includes(:addresses).includes(:ratings).find(params[:id])
    @address = @corporate.addresses.first

    if @address
      request_line = "https://maps.googleapis.com/maps/api/geocode/json?address=" + @address.street_one.split(" ").join("+") + ",+" + @address.city.split(" ").join("+") + ",+" + @address.state.to_s.split(" ").join("+") + "&key=" + RipeCom::Application::GOOGLE_MAP_API_KEY
      res = Net::HTTP.get(URI.parse(request_line))
      res = JSON.parse(res)

      @location_lat = res["results"][0]["geometry"]["location"]["lat"]
      @location_lng = res["results"][0]["geometry"]["location"]["lng"]
    end

    @bundlings = [];
    @corporate.deals.each do |deal|
      deal.bundlings.each do |bundling|
        @bundlings.push(bundling)
      end
    end

    if @corporate
      render "show"
    else
      render json: "Corporate not found.", status: 404
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
