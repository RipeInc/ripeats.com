class Api::TransactionsController < ApplicationController
    def create
      user_id = params[:user_id]
      deals = params[:deals]

      sum = 0
      deals.each do |deal|
        sum += deal[1]
      end
      sum += (sum * 0.08875).floor

      @transaction = Transaction.new({user_id: user_id, amount: sum});

      if @transaction.save
        deals.each do |deal|
          @bundling = Bundling.new({transaction_id: @transaction.id, deal_id: deal[0], price: deal[1]})
          @bundling.save
        end
        @transaction = Transaction.includes(bundlings: {deal: :corporate}).find(@transaction.id)
        render "show"
      else
        render json: @transaction.errors.full_messages, status: 422
      end
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
