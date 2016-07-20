const Dispatcher = require('../dispatcher')
const Constants = require('../constants')

const CollectionActions = {
  fetchAllCollections() {
    $.get('api/collections', CollectionActions._receiveAllCollections)
  },
  createCollection(collection) {
    $.post('api/collections', {collection: collection}, CollectionActions._receiveCollection)
  },
  deleteCollection(collection_id) {
    $.ajax({
      url: 'api/collections/' + collection_id,
      type: 'DELETE',
      data: {collection: {collection_id: collection_id}},
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
  _removeCollection(collection) {
    Dispatcher.dispatch({
      type: Constants.COLLECTION_REMOVED,
      collection: collection
    })
  }
}

module.exports = CollectionActions
