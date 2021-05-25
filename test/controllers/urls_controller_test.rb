require "test_helper"
require 'digest'


class UrlsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "to_check_short_ur_nil_at_initialize" do
    url = Url.new(originalUrl: "https://stackoverflow.com/questions/36850888/ruby-on-rails-change-column-to-null-not-work")
    assert_nil url.shortCode
  end

  test "to_check_short_url" do
    url = Url.new(originalUrl: "https://stackoverflow.com/questions/36850888/ruby-on-rails-change-column-to-null-not-work")
    url.shortCode = shortened_url
    assert_not_nil url.shortCode
  end

  def shortened_url
    srand
    seed = "--#{rand(10000)}--#{Time.now}--"
    return Digest::SHA1.hexdigest(seed)[0,6]
  end
  
end