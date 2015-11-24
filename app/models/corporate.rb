class Corporate < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token

  def password=(password)
    @password = password
    self.password_digest = BCryps::Password.create(password)
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
    return sesseion_token
  end

  def self.find_by_credentials(name, password)
    @corporate = Corporate.find_by_corporate_name(name)
    return @corporate if (@corporate && @corporate.is_password?(password))

    @corporate = Corporate.find_by_email(name)
    return @corporate if (@corporate && @corporate.is_password?(password))

    nil
  end
end
