class Characteristic < ActiveRecord::Base
  validates :name, :collection_id, presence: true
  belongs_to :collection
end
