class Api::SessionsController < ApplicationController

  def create
    @corporate = Corporate.find_by_credentials(session_params[:name], session_params[:password])

    if @corporate
      log_in!(@corporate)
      render json: @corporate
    else
      render json: "Credential match failed.", status: 403
    end
  end

  def destroy
    @entity = current_user || current_corporate
    log_out!
    render json: @entity
  end

  private
  def session_params
    params.require(:session).permit(:name, :password)
  end
end