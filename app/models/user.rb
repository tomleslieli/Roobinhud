class User < ApplicationRecord
    attr_reader :password
    
    validates :email, :full_name, :address, :buying_power, :stocks_value, :password_digest, :session_token, presence: true
    validates :email, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    has_one :user_portfolio,
    dependent: :destroy, 
    foreign_key: 'portfolio_owner_id'

    has_many :user_watchlists,
    dependent: :destroy, 
    foreign_key: 'watchlist_owner_id'

    has_many :user_portfolio_stocks,
    through: :user_portfolio,
    source: :portfolio_item

    has_many :user_watchlist_stocks,
    through: :user_watchlists,
    source: :watchlist_item
    
    after_initialize :ensure_session_token

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        generate_session_token
        save!
        self.session_token
    end

    private

    def ensure_session_token
        generate_session_token unless self.session_token
    end

    def new_session_token
        SecureRandom.urlsafe_base64
    end

    def generate_session_token
        self.session_token = new_session_token
        while User.find_by(session_token: self.session_token)
            self.session_token = new_session_token
        end
        self.session_token
    end
end