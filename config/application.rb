require File.expand_path('../boot', __FILE__)

require 'rails/all'
require 'csv'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RipeCom
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    RADIUS_OF_EARTH = 3959

    ZIP_CODES = {}
    file = File.join(Rails.root, 'app', 'csv', 'zipcode.csv')
    csv_text = File.read(file)
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |line|
      if !line.zip[0]
        next
      end
      zip_code = line["zip"]
      latitude = line["latitude"]
      longitude = line["longitude"]
      ZIP_CODES[zip_code] = {:latitude => latitude, :longitude => longitude}
    end

    ZIP_CODES_IN_TWO_MILES = {}

    def self.ALL_NEAR_ZIP(start_zip)
      return [] if !ZIP_CODES[start_zip]

      cached_result = ZIP_CODES_IN_TWO_MILES[start_zip]
      if cached_result
        return cached_result
      end

      cache = []
      ZIP_CODES_IN_TWO_MILES[start_zip] = cache

      start_data = ZIP_CODES[start_zip]
      start_latitude = start_data[:latitude]
      start_longitude = start_data[:longitude]

      ZIP_CODES.each do |zip_code, end_data|
        end_latitude = end_data[:latitude]
        end_longitude = end_data[:longitude]

        # sin_diff_lat = Math.sin((end_latitude.to_f - start_latitude.to_f)/2)
        # sin_diff_long = Math.sin((end_longitude.to_f - start_longitude.to_f)/2)
        # cos_lat_start = Math.cos(start_latitude.to_f)
        # cos_lat_end = Math.cos(end_latitude.to_f)
        #
        # distance = 2*RADIUS_OF_EARTH*Math.asin(Math.sqrt(sin_diff_lat * sin_diff_lat + cos_lat_start * cos_lat_end * sin_diff_long * sin_diff_long))

        latitude_diff = (end_latitude.to_f - start_latitude.to_f).abs * 69
        longtitude_diff = (end_longitude.to_f - start_longitude.to_f).abs * 54.6
        distance = Math.sqrt(latitude_diff * latitude_diff + longtitude_diff * longtitude_diff)

        if distance <= 5
          cache.push(zip_code)
        end
      end

      return cache
    end


  end
end
