const Dispatcher = require("../dispatcher")
const CharacteristicActions = require("./characteristic_actions")

const CollectionActions = {
  fetchAllCollections() {
    $.get('api/collections', CollectionActions._receiveCollections)
  },
  fetchSingleCollection(id) {
    $.get('api/collections/' + id, CollectionActions._receiveCollection)
  },
  createCollection(collection) {
    $.post('api/collections', {collection}, (response) => {
      CollectionActions._receiveCollection(response)
      CharacteristicActions.createCharacteristics(collection.characteristics, response.id)
    })
  },
  deleteCollection(id) {
    $.ajax({
      url: 'api/collections/' + id,
      type: 'delete',
      data: {id},
      success: CollectionActions._removeCollection
    })
  },
  editCollection(collection) {
    $.ajax({
      url: 'api/collections/' + collection.id,
      type: "patch",
      data: {collection},
      success: CollectionActions._receiveCollection
    })
  },
  _receiveCollections(collections) {
    Dispatcher.dispatch({
      type: "collections received",
      collections
    })
  },
  _receiveCollection(collection) {
    Dispatcher.dispatch({
      type: "collection received",
      collection
    })
  },
  _removeCollection(id) {
    Dispatcher.dispatch({
      type: "collection removed",
      id
    })
  }
}

module.exports = CollectionActions
