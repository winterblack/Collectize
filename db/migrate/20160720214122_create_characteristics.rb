class CreateCharacteristics < ActiveRecord::Migration
  def change
    create_table :characteristics do |t|
      t.string :name, null: false
      t.integer :collection_id, null: false
      t.timestamps null: false
    end
    add_index :characteristics, :collection_id
  end
end
