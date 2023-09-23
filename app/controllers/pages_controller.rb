# require 'google/apis/calendar_v3'

class PagesController < ApplicationController
  before_action :authenticate_user!

  def home
    client = Signet::OAuth2::Client.new(client_options)
    redirect_to client.authorization_uri.to_s, allow_other_host: true
  end

  def callback
    client = Signet::OAuth2::Client.new(client_options)
    client.code = params[:code]
    response = client.fetch_access_token!
    session[:authorization] = response
    redirect_to new_file_path
  end

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

  def new_event
    # file_path = Rails.root.join('app', 'assets', 'images', 'upload', params[:file_name])
    # relative_path = Pathname.new(file_path).relative_path_from(Rails.root).to_s
    # client = Google::Cloud::Vision.image_annotator
    # response = client.text_detection(image: relative_path)
    # text_descriptions = []
    # response.responses.each do |annotation|
    #   annotation.text_annotations.each do |text_annotation|
    #     text_descriptions << text_annotation.description
    #   end
    # end

    # new_array = text_descriptions[0].split(' ')
    # start_date = Date.parse(new_array[4])
    # end_date = Date.parse(new_array[6])
    # dates = []
    # days = []
    # (start_date..end_date).each do |date|
    #   dates << date
    #   days << date.day
    # end

    # new_array = text_descriptions[0].split("\n").map(&:split)
    # hours = []

    # new_array.each do |line|
    #   line.each do |element|
    #     if element.match?(/\d{2}\/\d{2}\/\d{4}/)
    #     elsif element.match?(/\d{2}:\d{2}-\d{2}:\d{2}/)
    #       hours << element
    #     elsif element == 'Repos' || element == 'Fermé'
    #       hours << element
    #     elsif element.match?(/\d{2}/) && !element.match?(/\d{2}:/)
    #       hours << element
    #     end
    #   end
    # end

    # hours = hours.reject { |element| element.match?(/\d{2}mn\z/) || element.match?(/\d{3}\z/) }

    # start_hours = []
    # end_hours = []

    # days.each_with_index do |day, index|
    #   formatted_day = day.to_i < 10 ? "0#{day}" : day.to_s
    #   if index < days.length
    #     if /^[a-zA-Z]+$/.match?(hours[hours.index(formatted_day) + 1])
    #       start_hours << 'Repos'
    #     else
    #       start_hours << hours[hours.index(formatted_day.to_s) + 1].split('-')[0]
    #     end
    #   end
    # end

    # days.drop(1).each_with_index do |day, index|
    #   formatted_day = day < 10 ? "0#{day}" : day.to_s
    #   if index < days.length
    #     if /^[a-zA-Z]+$/.match?(hours[hours.index(formatted_day) - 1])
    #       end_hours << 'Repos'
    #     else
    #       end_hours << hours[hours.index(formatted_day.to_s) - 1].split('-')[1]
    #     end
    #   end
    # end
    # end_hours << 'Repos'

    # @values = {
    #   date: dates,
    #   start_hour: start_hours,
    #   end_hour: end_hours
    # }

    # File.delete(file_path)
  end

  def create_event
    client = Signet::OAuth2::Client.new(client_options)
    client.update!(session[:authorization])
    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = client
    params[:form_values].each do |index, param|
      event = Google::Apis::CalendarV3::Event.new(
        summary: 'Travail',
        start: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: DateTime.parse("#{param[:date]}T#{param[:start_hour]}:00+02:00"),
          time_zone: 'Europe/Paris'
        ),
        end: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: DateTime.parse("#{param[:date]}T#{param[:end_hour]}:00+02:00"),
          time_zone: 'Europe/Paris'
        )
      )
      service.insert_event('primary', event) unless %w[Repos Fermé].include?(param[:start_hour])
    end
    redirect_to root_path
  end

  private

  def client_options
    {
      client_id: ENV['GOOGLE_CLIENT_ID'],
      client_secret: ENV['GOOGLE_CLIENT_SECRET'],
      authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
      scope: Google::Apis::CalendarV3::AUTH_CALENDAR,
      redirect_uri: callback_url
    }
  end
end
