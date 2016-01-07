# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  profile_image   :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token

  has_many :addresses, as: :locatable

  has_many(
    :ratings,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "Rating"
  )

  has_many(
    :transactions,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "Transaction"
  )

  has_many(
    :cart_selections,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "CartSelection"
  )

  has_many(
    :deal_selections,
    through: :cart_selections,
    source: :deal
  )

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password_verify=(password_verify)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end


  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token
    session_token = User.generate_session_token
    self.session_token = session_token
    self.save
    return session_token
  end

  def self.find_by_credentials(name, password)
    @user = User.find_by_username(name)
    return @user if (@user && @user.is_password?(password))

    @user = User.find_by_email(name)
    return @user if (@user && @user.is_password?(password))

    nil
  end
end
