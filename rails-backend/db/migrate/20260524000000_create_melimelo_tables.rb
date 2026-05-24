class CreateMelimeloTables < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email, null: false, index: { unique: true }
      t.timestamps
    end

    create_table :contacts, id: :uuid do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.text :message, null: false
      t.timestamps
    end

    create_table :partnerships, id: :uuid do |t|
      t.string :name, null: false
      t.string :company
      t.string :email, null: false
      t.string :instagram
      t.string :tiktok
      t.string :youtube
      t.string :partnership_type, null: false
      t.text :message, null: false
      t.timestamps
    end

    create_table :songs, id: :uuid do |t|
      t.string :title, null: false
      t.string :duration
      t.string :color
      t.boolean :released, default: false
      t.timestamps
    end
  end
end
