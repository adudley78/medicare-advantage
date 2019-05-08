require 'json'
require 'net/http'
require 'pry'

class Company < ActiveRecord::Base

  attr_accessor :company_url

  def initialize(company_url)
    @company_url = company_url
  end

  def self.get_api_response
    # binding.pry
    uri = URI.parse(URI.encode('https://csgapi.appspot.com/v1/medicare_advantage/open/companies.json'))
    api_response = Net::HTTP.get(uri)
    JSON.parse(api_response)
  end

  def self.make_giphs(api_response)
    binding.pry
  end

end
