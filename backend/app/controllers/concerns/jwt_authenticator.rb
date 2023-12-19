module JwtAuthenticator
  require 'jwt'

  SECRET_KEY_BASE = Rails.application.credentials.secret_key_base

  def jwt_authenticate
    if request.headers['Authorization'].blank?
      render json: { status: "ERROR", message: 'Not authorized' }, status: :unauthorized
    else
      encoded_token = request.headers['Authorization'].split('Bearer ').last
      payload = decode(encoded_token)
      @user = User.find(payload['user_id'])
    end
  end

  def encode(user_id)
    expires_in = 1.month.from_now.to_i
    preload = { user_id: user_id, exp: expires_in }
    JWT.encode(preload, SECRET_KEY_BASE, 'HS256')
  end

  def decode(encoded_token)
    decoded_dwt = JWT.decode(encoded_token, SECRET_KEY_BASE, true, algorithm: 'HS256')
    decoded_dwt.first
  end
end