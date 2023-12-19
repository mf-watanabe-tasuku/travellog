class RemoveColumnSlugFromPosts < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :slug
    remove_column :posts, :image
  end
end
