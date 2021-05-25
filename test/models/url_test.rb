require 'test_helper'

class UserTest < ActiveSupport::TestCase
    attr_accessor :url
    def setup
        @url = Url.new()
    end

    def test_original_url_should_be_not_be_empty
        assert_not url.valid?
        assert_equal ["Originalurl can't be blank"], @url.errors.full_messages
    end

    def test_with_original_url
        url.originalUrl = "https://stackoverflow.com/questions/36850888/ruby-on-rails-change-column-to-null-not-work"
        assert url.valid?
        assert_equal [], @url.errors.full_messages
    end  
end