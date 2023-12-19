class Api::V1::EyecatchesController < ApplicationController
  def create
    res = Cloudinary::Uploader.upload(
      params[:files],
      folder: "travellog",
      public_id: "eyecatch_" + params[:refId]
    )

    post = Post.find(params[:refId])
    eyecatch = post.build_eyecatch(image: res['secure_url'])

    if eyecatch.save
      render json: { status: "SUCCESS", message: "Saved eyecatch", data: eyecatch }, status: :ok
    else
      render json: { status: "ERROR", message: "Eyecatch not saved", data: eyecatch.errors }, stauts: :unprocessable_entity
    end
  end

  def destroy
    eyecatch = Eyecatch.find(params[:id])
    eyecatch.delete
    render json: { status: "SUCCESS", message: "Deleted eyecatch" }, status: :ok
  end
end
