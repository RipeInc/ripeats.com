class Api::TransactionsController < ApplicationController

    def create
      byebug
    end

    def corporate_transactions
      @corporate = Corporate.includes(:transactions).find(params[:corporate_id])
      @transactions = @corporate.transactions
      render json: @transactions
    end

    def user_transactions
      @user = User.includes(:transactions).find(params[:user_id])
      @transactions = @user.transactions
      render json: @transactions
    end

    def deal_transactions
      @Deal = Deal.includes(:transactions).find(params[:deal_id])
      @transactions = @deal.transactions
      render json: @transactions
    end

    private

    def transaction_params
      params.require(:transaction).permit(:corporate_id, :user_id, :deal_id, :type, :card_number, :expiration_month, :expiration_year, :security_code, :user, :deals)
    end

end
