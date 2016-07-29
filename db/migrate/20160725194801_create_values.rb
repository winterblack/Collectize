class CreateValues < ActiveRecord::Migration
  def change
    create_table :values do |t|
      t.string :value
      t.integer :item_id, null: false
      t.integer :characteristic_id, null: false
      t.timestamps null: false
    end
    add_index :values, :item_id
    add_index :values, :characteristic_id
  end
end
