class Post < ApplicationRecord
  has_one :eyecatch, dependent: :destroy
  belongs_to :user

  validates :title, presence: true, length: { maximum: 100 }

  attribute :eyecatchId, :string
  attribute :eyecatchUrl, :string
end