class Collection < ActiveRecord::Base
  validates :title, :user_id, presence: true
  belongs_to :user
  has_many :characteristics, dependent: :destroy
  has_many :items, dependent: :destroy
end
