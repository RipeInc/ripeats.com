class Api::RatingsController < ApplicationController

  def check
    @user_id = params[:user_id].to_i
    @corporate_id = params[:corporate_id].to_i

    @rating  = Rating.where({ user_id: @user_id, corporate_id: @corporate_id });
    if @rating
      render json: @rating
    else
      render json: {}
    end
  end

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

  def create
    @rating = Rating.new(rating_params)
    if @rating.save
      render json: @rating
    else
      render json: @rating.errors.full_messages, status: 422
    end
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update(rating_params)
      render json: @rating
    else
      render json: @rating.errors.full_messages
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:rating, :description, :corporate_id, :user_id)
  end

end
