require './config/environment'
require 'json'

class ApplicationController < Sinatra::Base
  register Sinatra::ActiveRecordExtension
  set :session_secret, "my_application_secret"
  set :views, Proc.new { File.join(root, "../views/") }

  configure do
    set :public_folder, 'public'
    set :views, 'app/views'
  end

  get "/" do

    erb :index
  end

  get '/search' do
    @companies = Company.all
    if params[:search]
      @companies = Company.search(params[:search])

      # how to render search results on same page
      # erb :'/companies/result'
    end
  end

end
