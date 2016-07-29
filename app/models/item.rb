class Item < ActiveRecord::Base
  validates :title, :image_url, :collection_id, presence: true
  belongs_to :collection
  has_many :values, dependent: :destroy
  has_many :characteristics, through: :values
end
