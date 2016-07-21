const Dispatcher = require('../dispatcher')
const Constants = require('../constants')
const CharacterisicActions = require("./characteristic_actions")

const CollectionActions = {
  fetchAllCollections() {
    $.get('api/collections', CollectionActions._receiveAllCollections)
  },
  createCollection(collection) {
    $.post('api/collections', {collection: collection}, (response) => {
      CollectionActions._receiveCollection(response)
      CharacterisicActions.createCharacteristics(collection.characteristics, response.id)
    })
  },
  deleteCollection(id) {
    $.ajax({
      url: 'api/collections/' + id,
      type: 'DELETE',
      data: {id: id},
      success: CollectionActions._removeCollection
    })
  },
  editCollection(collection) {
    $.ajax({
      url: 'api/collections/' + collection.id,
      type: 'PATCH',
      data: {collection: collection},
      success: CollectionActions._receiveCollection
    })
  },
  _receiveAllCollections(collections) {
    Dispatcher.dispatch({
      type: Constants.COLLECTIONS_RECEIVED,
      collections: collections
    })
  },
  _receiveCollection(collection) {
    Dispatcher.dispatch({
      type: Constants.COLLECTION_RECEIVED,
      collection: collection
    })
  },
  _removeCollection(id) {
    Dispatcher.dispatch({
      type: Constants.COLLECTION_REMOVED,
      id: id
    })
  }
}

module.exports = CollectionActions
