class CreateUrls < ActiveRecord::Migration[6.1]
  def change
    create_table :urls do |t|
      t.string :originalUrl
      t.string :shortCode
      t.integer :clicks
      t.boolean :pinned
      t.timestamps
    end
  end
end
