const Dispatcher = require('../dispatcher')
const Constants = require('../constants')

const CollectionActions = {
  fetchAllCollections() {
    $.get('api/collections', CollectionActions.receiveAllCollections)
  },
  createCollection(collection) {
    $.post('api/collections', {collection: collection}, CollectionActions.addCollection)
  },
  receiveAllCollections(collections) {
    Dispatcher.dispatch({
      type: Constants.COLLECTIONS_RECEIVED,
      collections: collections
    })
  },
  addCollection(collection) {
    Dispatcher.dispatch({
      type: Constants.COLLECTION_RECEIVED,
      collection: collection
    })
  }
}

module.exports = CollectionActions
