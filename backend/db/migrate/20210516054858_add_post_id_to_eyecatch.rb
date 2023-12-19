class AddPostIdToEyecatch < ActiveRecord::Migration[6.1]
  def change
    add_column :eyecatches, :post_id, :integer
  end
end
