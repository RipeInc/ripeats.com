class Api::BundlingsController < ApplicationController

  def destroy
    @bundling = Bundling.find(params[:id])
    @bundling.destroy
    render json: @bundling
  end
end
