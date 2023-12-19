class Api::V1::PostsController < ApplicationController
  include JwtAuthenticator
  before_action :jwt_authenticate, except: %i[ index show count ]
  before_action :correct_user, only: %i[ update ]
  before_action :set_post, only: %i[ show update destroy ]

  def index
    limit = request.query_parameters['limit']
    start = request.query_parameters['start']

    posts = Post.order(created_at: :desc)
                .limit(limit)
                .offset(start)
                .includes(:eyecatch)

    posts.each do |post|
      post.eyecatchUrl = post.eyecatch['image'] if post.eyecatch
    end

    render json: { status: "SUCCESS", message: "Loaded posts", data: posts }, status: :ok
  end

  def count
    count = Post.count
    render json: { status: "SUCCESS", message: "Loaded post count", data: count }, status: :ok
  end

  def me
    posts = Post.where(user_id: @user.id).order("updated_at DESC")
    render json: { status: "SUCCESS", message: "Loaded user posts", data: posts }, stauts: :ok
  end

  def show
    if @post.eyecatch
      @post.eyecatchId = @post.eyecatch['id']
      @post.eyecatchUrl = @post.eyecatch['image']
    end

    render json: { status: "SUCCESS", message: "Loaded post", data: @post }, status: :ok
  end

  def create
    post = Post.new(post_params.merge(user_id: @user.id))

    if post.save
      render json: { status: "SUCCESS", message: "Saved post", data: post }, status: :ok
    else
      render json: { status: "ERROR", message: "Post not saved", data: post.errors.full_messages[0] }, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: { stauts: "SUCCESS", message: 'Updated post', data: @post}, status: :ok
    else
      render json: { status: "ERROR", message: 'Update failed', data: @post.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @post.delete
    render json: { status: "SUCCESS", message: "Post deleted" }, status: :ok
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :place)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def correct_user
    post = Post.find(params[:id])
    if @user.id != post.user_id
      render json: { status: "ERROR", message: 'Not authorized' }, status: :unprocessable_entity
    end
  end
end