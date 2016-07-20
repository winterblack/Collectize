const Dispatcher = require('../dispatcher')
const Constants = require('../constants')

const CollectionActions = {
  fetchAllCollections() {
    $.get('api/collections', CollectionActions._receiveAllCollections)
  },
  createCollection(collection) {
    $.post('api/collections', {collection: collection}, CollectionActions._addCollection)
  },
  deleteCollection(collection_id) {
    $.ajax({
      url: 'api/collections/' + collection_id,
      type: 'DELETE',
      data: {collection: {collection_id: collection_id}},
      success: CollectionActions._removeCollection
    })
  },
  _receiveAllCollections(collections) {
    Dispatcher.dispatch({
      type: Constants.COLLECTIONS_RECEIVED,
      collections: collections
    })
  },
  _addCollection(collection) {
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
