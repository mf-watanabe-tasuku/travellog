class Api::V1::Auth::SessionsController < ApplicationController
  include JwtAuthenticator

  def create
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
      jwt_token = encode(user.id)
      data = {
        jwt: jwt_token,
        user: user
      }
      render json: { status: "SUCCESS", message: "Logged in", data: data }, status: :ok
    else
      render json: { status: "ERROR", message: 'Email or password invalid' }, status: :unprocessable_entity
    end
  end
end
