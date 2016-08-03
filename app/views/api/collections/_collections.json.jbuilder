collections.each do |collection|
  json.set! collection.id, {
    id: collection.id,
    user_id: collection.user_id,
    title: collection.title,
    characteristics: collection.characteristics.map { |characteristic|
      {
        id: characteristic.id,
        name: characteristic.name
      }
    },
    items: collection.items.map { |item| item.id }
  }
end
