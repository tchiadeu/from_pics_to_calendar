require "google/cloud/vision"

Google::Cloud::Vision.configure do |config|
  if Rails.env.production?
    config.credentials = JSON.parse(ENV['GOOGLE_CLOUD_API_KEY'])
  else
    config.credentials = ENV['GOOGLE_CLOUD_API_KEY']
  end
end
