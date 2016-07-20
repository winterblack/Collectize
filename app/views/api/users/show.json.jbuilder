json.extract! @user, :id, :username

json.collections do
  @user.collections.each do
    |collection| json.set! collection.id, {
      id: collection.id, user_id: collection.user_id, title: collection.title
    }
  end
end
