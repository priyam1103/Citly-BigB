class AddNonNullableFields < ActiveRecord::Migration[6.1]
  def change
    change_column :urls, :originalUrl, :string, null: false
  end
end
