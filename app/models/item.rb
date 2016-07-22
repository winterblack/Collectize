class Item < ActiveRecord::Base
  validates :title, :image_url, :collection_id, presence: true
  belongs_to :collection
end
