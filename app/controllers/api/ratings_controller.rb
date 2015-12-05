class Api::RatingsController < ApplicationController

  def corporate_ratings
    @corporate = Corporate.includes(:ratings).find(params[:corporate_id])
    @ratings = @corporate.ratings
    render json: @ratings
  end

  def user_ratings
    @user = User.includes(:ratings).find(params[:user_id])
    @ratings = @user.ratings
    render json: @ratings
  end

  private

  def rating_params
    params.require(:rating).permit(:corporate_id, :user_id)
  end

end
