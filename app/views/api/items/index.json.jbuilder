@items.each do |item|
  json.set! item.id, {
    id: item.id,
    collection_id: item.collection_id,
    title: item.title,
    image_url: item.image_url
  }
end
