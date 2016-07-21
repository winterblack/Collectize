const Dispatcher = require('../dispatcher')
const Constants = require('../constants')

const CharacteristicActions = {
  createCharacteristics(characteristics, collection_id) {
    characteristics.forEach( characteristic => {
      characteristic["collection_id"] = collection_id
      CharacteristicActions.createCharacteristic(characteristic)
    })
  },
  createCharacteristic(characteristic) {
    $.post('api/characteristics', {characteristic: characteristic})
  },
  deleteCharacteristic(id) {
    $.ajax({
      url: 'api/characteristics/' + id,
      type: 'DELETE',
    })
  }
}

module.exports = CharacteristicActions
