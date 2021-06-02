class ChangeColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :urls, :originalUrl, :original_url
    rename_column :urls, :shortCode, :short_code
  end
end
