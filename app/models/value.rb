class Value < ActiveRecord::Base
  validates :item_id, :characteristic_id, presence: true
  belongs_to :characteristic
  belongs_to :item
end
