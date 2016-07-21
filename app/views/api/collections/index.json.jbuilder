@collections.each do |collection|
  json.set! collection.id, {
    id: collection.id,
    user_id: collection.user_id,
    title: collection.title,
    characteristics: collection.characteristics.map do |characteristic|
      {
        name: characteristic.name,
        id: characteristic.id
      }
    end
  }
end
