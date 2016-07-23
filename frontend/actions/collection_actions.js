const Dispatcher = require("../dispatcher")

const CollectionActions = {
  fetchAllCollections() {
    $.get('api/collections', CollectionActions._receiveCollections)
  },
  fetchUserCollections() {
    $.get('api/user', CollectionActions._receiveUserCollections)
  },
  fetchSingleCollection(id) {
    $.get('api/collections/' + id, CollectionActions._receiveCollection)
  },
  createCollection(collection) {
    $.post('api/collections', {collection: collection}, (response) => {
      CollectionActions._receiveCollection(response)
    })
  },
  deleteCollection(id) {
    $.ajax({
      url: 'api/collections/' + id,
      type: 'delete',
      data: {id: id},
      success: CollectionActions._removeCollection
    })
  },
  editCollection(collection) {
    $.ajax({
      url: 'api/collections/' + collection.id,
      type: "patch",
      data: {collection: collection},
      success: CollectionActions._receiveCollection
    })
  },
  _receiveCollections(collections) {
    Dispatcher.dispatch({
      type: "collections received",
      collections: collections
    })
  },
  _receiveUserCollections(user) {
    Dispatcher.dispatch({
      type: "user collections received",
      collections: user.collections
    })
  },
  _receiveCollection(collection) {
    Dispatcher.dispatch({
      type: "collection received",
      collection: collection
    })
  },
  _removeCollection(id) {
    Dispatcher.dispatch({
      type: "collection removed",
      id: id
    })
  }
}

module.exports = CollectionActions
