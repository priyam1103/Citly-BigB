class UrlsController < ApplicationController
    attr_accessor :url
    before_action :check_url, only: :create
    before_action :get_params, only: :create 
    before_action :get_url, only: %i[create show update destroy]
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
        new_url = Url.new(get_params)
        new_url.clicks = 0
        new_url.short_code = shortened_url
        new_url.pinned = false
        if new_url.save
            render status: :ok, json: { notice: 'Url shortend', url: new_url  }
        else
            render status: :unprocessable_entity, json: {
                  errors: url.errors.full_messages.to_sentence
            }
        end
    end

    def show 
        if url
            url.update_attribute(:clicks, url.clicks+1)
            redirect_to url.original_url
        else
            redirect_to "https://citly-priyam-internship-l0.herokuapp.com/"
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
            render status: :unprocessable_entity, json: { errors: url.errors.full_messages }
        end
    end

    def get_params
        params.permit(:original_url)
    end

    def check_url
        @url = Url.find_by(original_url: params[:original_url])
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

    def get_url
        @url = Url.find_by(short_code: params[:id])
        puts @url
        rescue ActiveRecord::RecordNotFound => errors
          render json: {errors: errors}
    end
    
end
