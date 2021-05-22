class UrlsController < ApplicationController
    attr_accessor :url
    before_action :checkUrl, only: :create
    before_action :getParams, only: :create 
    before_action :getUrl, only: %i[create show update destroy]
    require 'digest'

    def index
        urls = Url.all.order(pinned: :desc , created_at: :desc)
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
        newurl.pinned = false
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
            url.update_attribute(:clicks, url.clicks+1)
            redirect_to url.originalUrl
        else
            redirect_to "http://localhost:3000"
        end
    end

    def update
        if url
            url.update_attribute(:pinned, !url.pinned)
            if url.save
                render status: :ok, json: { url: url }
            else
                render status: :unprocessable_entity, json: { errors: url.errors.full_messages }
            end
        else
            render status: :unprocessable_entity, json: { errors: url.errors.full_messages }
        end
    end

    def destroy
        if url.destroy
            render status: :ok, json: { notice: 'Successfully deleted url.' }
          else
            render status: :unprocessable_entity, json: { errors:
            url.errors.full_messages }
          end
    end

    def getParams
        params.permit(:originalUrl)
    end

    def checkUrl
        @url = Url.find_by(originalUrl: params[:originalUrl])

        if @url
            render status: :unprocessable_entity, json: {already: true, errors: "Shortened URL already exists"}
        end
    end
    private

    def shortened_url
        srand
        seed = "--#{rand(10000)}--#{Time.now}--"
        return Digest::SHA1.hexdigest(seed)[0,6]
    end

    def getUrl
        @url = Url.find_by(shortCode: params[:id])
        puts @url
        rescue ActiveRecord::RecordNotFound => errors
          render json: {errors: errors}
      end
end
