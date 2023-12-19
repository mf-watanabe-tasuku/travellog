class Api::V1::Auth::UsersController < ApplicationController
  include JwtAuthenticator
  before_action :jwt_authenticate, only: %i[ user ]

  def create
    user = User.new(user_params)
    if user.save
      jwt_token = encode(user.id)
      user_data = {
        jwt: jwt_token,
        user: user
      }
      render json: { status: "SUCCESS", message: "User registered", data: user_data }, status: :ok
    else
      render json: { status: "ERROR", message: 'User not saved' }, status: :unprocessable_entity
    end
  end

  def user
    render json: { status: "SUCCESS", message: "Loaded user", data: @user }, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
