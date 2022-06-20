class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )

        if @user.nil?
            flash.now[:errors] = ['Unable to log in with provided credentials.']
        else
            login!(@user)
            render '/api/users/show'
        end
    end

    def destroy
        @user = current_user
        if @user
            logout!
            render 'api/users/show'
        else
            render json: ['User is not signed in.'], status: 404
        end
    end
end
