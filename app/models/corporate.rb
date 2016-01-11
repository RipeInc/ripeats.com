# == Schema Information
#
# Table name: corporates
#
#  id                :integer          not null, primary key
#  corporate_name    :string           not null
#  description       :string
#  email             :string           not null
#  profile_image     :string
#  corporate_contact :string
#  password_digest   :string           not null
#  session_token     :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Corporate < ActiveRecord::Base
  attr_reader :password
  attr_accessor :zip_code

  validates :corporate_name, :email, :password_digest, :session_token, presence: true
  validates :corporate_name, :email, uniqueness: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  has_many :addresses, as: :locatable

  has_many(
    :ratings,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Rating"
  )

  has_many(
    :menu_items,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "MenuItem"
  )

  has_many(
    :deals,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Deal"
  )

  has_many(
    :transactions,
    through: :deals,
    source: :transactions
  )

  def zip_code
    self.addresses.first.zip_code
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password_verify=(password_verify)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    session_token = Corporate.generate_session_token
    self.session_token = session_token
    self.save
    return session_token
  end


  def self.find_by_credentials(name, password)
    @corporate = Corporate.find_by_corporate_name(name)
    return @corporate if (@corporate && @corporate.is_password?(password))

    @corporate = Corporate.find_by_email(name)
    return @corporate if (@corporate && @corporate.is_password?(password))

    nil
  end
end
