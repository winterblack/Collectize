const Dispatcher = require('../dispatcher')

const CharacteristicActions = {
  createCharacteristics(characteristics, collection_id) {
    characteristics.forEach( characteristic => {
      characteristic["collection_id"] = collection_id
      CharacteristicActions.createCharacteristic(characteristic)
    })
  },
  createCharacteristic(characteristic) {
    $.post('api/characteristics', {characteristic})
  },
  deleteCharacteristic(id) {
    $.ajax({
      url: 'api/characteristics/' + id,
      type: 'delete',
    })
  }
}

module.exports = CharacteristicActions
