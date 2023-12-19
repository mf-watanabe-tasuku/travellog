class CreateEyecatches < ActiveRecord::Migration[6.1]
  def change
    create_table :eyecatches do |t|
      t.string :image

      t.timestamps
    end
  end
end
