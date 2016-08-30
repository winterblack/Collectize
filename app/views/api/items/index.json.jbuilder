json.array! @items do |item|
  json.id item.id
  json.collection_id item.collection_id
  json.title item.title
  json.image_url item.image_url
  json.values do
    item.values.each do |value|
      json.set! value.characteristic_id do
        json.id value.id
        json.value value.value
      end
    end
  end
end
