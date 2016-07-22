@collections.each { |collection|
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
    items: collection.items.map { |item|
      {
        id: item.id,
        title: item.title,
        image_url: item.image_url
      }
    }
  }
}
