json.extract! @user, :id, :username
json.collections do
  json.partial! 'api/collections/collections', collections: @user.collections
end
