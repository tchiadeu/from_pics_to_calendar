class PagesController < ApplicationController
  before_action :authenticate_user!

  def home; end

  def new_file; end

  def upload
    if params[:image].present?
      file_path = Rails.root.join('app', 'assets', 'images', 'upload', params[:image].original_filename)
      File.open(file_path, 'wb') do |file|
        file.write(params[:image].read)
      end
      redirect_to new_event_path(file_name: params[:image].original_filename)
    else
      render :new_file, status: :unprocessable_entity
    end
  end
end
