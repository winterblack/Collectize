@collections.each do
  |collection| json.set! collection.id, {
    id: collection.id, user_id: collection.user_id, title: collection.title
  }
end
