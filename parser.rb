#!/usr/bin/env ruby

require 'json'
require 'sinatra'
require 'yaml'
require 'sinatra/cross_origin'

configure do
  enable :cross_origin
end

package_directory = "/home/t882343/webchannel-ops/roles/package"

error 403 do
	":("
end

error 404 do
  "even more :("
end

set :public_folder, "#{ File.dirname(__FILE__) }/static"

get '/packages.json' do
	packages = Dir.entries(package_directory)
	packages.delete_if { |package| %w(. ..).include? package }
	packages.keep_if { |package| File.directory? "#{ package_directory }/#{ package }" }
	JSON.dump packages.sort
end

get '/package/:package/:section.json' do
	error 403 unless %w(defaults meta).include? params[:section]
	resource = "#{ package_directory }/#{ params[:package] }/#{ params[:section] }/main.yml"
	return {} unless File.exist? resource
	JSON.dump YAML.load_file resource
end
