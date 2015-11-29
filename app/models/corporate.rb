class Corporate < ActiveRecord::Base
  attr_reader :password

  validates :corporate_name, :email, :password_digest, :session_token, presence: true
  validates :corporate_name, :email, uniqueness: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  has_many :addresses, as: :locatable

  has_one(
    :menu,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Menu"
  )

  has_many(
    :ratings,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Rating"
  )

  has_many(
    :menu_items,
    through: :menu,
    source: :menu_items
  )

  has_many(
    :deals,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Deal"
  )

  has_many(
    :transactions,
    foreign_key: :corporate_id,
    primary_key: :id,
    class_name: "Transaction"
  )

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
