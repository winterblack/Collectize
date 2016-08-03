const Dispatcher = require('../dispatcher')
const ValueActions = require("./value_actions")

const CharacteristicActions = {
  createCharacteristics(characteristics, collection) {
    characteristics.forEach( characteristic => {
      characteristic["collection_id"] = collection.id
      CharacteristicActions.createCharacteristic(characteristic, collection)
    })
  },
  createCharacteristic(characteristic, collection) {
    $.post('api/characteristics', {characteristic}, (response) => {
      collection.items.forEach( item_id => {
        ValueActions.createValue({
          value: "",
          characteristic_id: response.id,
          item_id
        })
      })
    })
  },
  deleteCharacteristic(id) {
    $.ajax({
      url: 'api/characteristics/' + id,
      type: 'delete',
    })
  }
}

module.exports = CharacteristicActions
