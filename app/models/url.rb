class Url < ApplicationRecord
    validates :originalUrl, presence: true
end