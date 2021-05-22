class UrlsController < ApplicationController
    attr_accessor :url
    before_action :getParams, only: %i[create update]
    before_action :getUrl, only: :show
    require 'digest'

    def index
        urls = Url.all.order(pinned: :desc, created_at: :desc)
        if urls
            render status: :ok, json: { urls: urls }
        else
            render status: :unprocessable_entity, json: {
              errors: urls.errors.full_messages.to_sentence
            }
        end
    end


    def create
        newurl = Url.new(getParams)
        newurl.clicks = 0
        newurl.shortCode = shortened_url
        if newurl.save
            render status: :ok, json: { notice: 'Url shortend', url: newurl  }
        else
            render status: :unprocessable_entity, json: {
                  errors: url.errors.full_messages.to_sentence
            }
        end
    end

    def show 
        if url
            url.clicks += 1;
            url.save
            redirect_to url.originalUrl
        else
            redirect_to "http://localhost:3000"
        end
    end

   

    def getParams
        params.permit(:originalUrl)
    end

    private

    def shortened_url
        srand
        seed = "--#{rand(10000)}--#{Time.now}--"
        return Digest::SHA1.hexdigest(seed)[0,6]
    end

    def getUrl
        @url = Url.find_by(shortCode: params[:id])
        rescue ActiveRecord::RecordNotFound => errors
          render json: {errors: errors}
      end
end
