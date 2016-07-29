class Characteristic < ActiveRecord::Base
  validates :name, :collection_id, presence: true
  belongs_to :collection
  has_many :values, dependent: :destroy
end
