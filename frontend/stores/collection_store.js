const Store = require('flux/utils').Store
const Constants = require('../constants')
const Dispatcher = require('../dispatcher')
const CollectionStore = new Store(Dispatcher)
var _collections = {}

CollectionStore.all = function() {
  return _collections
}
CollectionStore.find = function(collectionId) {
  return _collections[collectionId]
}
function resetAllCollections(collections) {
  _collections = collections
}
function setCollection(collection){
  _collections[collection.id] = collection
}
function removeCollection(collection) {
  delete _collections[collection.id]
}
CollectionStore.__onDispatch = function(action) {
  switch(action.type) {
    case Constants.COLLECTIONS_RECEIVED:
      resetAllCollections(action.collections);
      CollectionStore.__emitChange()
      break;
    case Constants.COLLECTION_RECEIVED:
      setCollection(action.collection);
      CollectionStore.__emitChange()
      break;
    case Constants.COLLECTION_REMOVED:
      removeCollection(action.collection);
      CollectionStore.__emitChange()
      break;
  }
}

module.exports = CollectionStore
