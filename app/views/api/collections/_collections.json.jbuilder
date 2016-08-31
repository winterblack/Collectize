collections.each do |collection|
  json.set! collection.id do
    json.id collection.id
    json.user_id collection.user_id
    json.title collection.title
    json.items collection.items.map { |item| item.id }
    json.preview collection.items[0..8].map { |item| item.image_url }
    json.characteristics do
      collection.characteristics.each do |characteristic|
        json.set! characteristic.id do
          json.id characteristic.id
          json.name characteristic.name
          json.values characteristic.values.map { |value|
            if characteristic.values.all? { |value| value.value.to_i.to_s == value.value }
              value = value.value.to_i
            else
              value = value.value
            end
            value
          }.uniq.sort
        end
      end
    end
  end
end
