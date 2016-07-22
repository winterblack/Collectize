class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title, null: false
      t.string :image_url, null: false
      t.integer :collection_id, null: false
      t.timestamps null: false
    end
    add_index :items, :collection_id
  end
end
