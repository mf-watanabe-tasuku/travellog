#!/usr/bin/env bash
# exit on error
set -o errexit
bundle install
bundle exec rails db:migrate:reset
bundle exec rake db:seed
