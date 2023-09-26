class PhotosController < ApplicationController
  before_action :authenticate_user!

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(photo_params)
    @photo.image.attach(params[:image])
    if @photo.save
      redirect_to new_event_path(file_name: params[:image].original_filename)
    else
      render :new
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:image)
  end
end
