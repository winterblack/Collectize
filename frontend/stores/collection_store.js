const Store = require('flux/utils').Store
const Constants = require('../constants')
const Dispatcher = require('../dispatcher')
const CollectionStore = new Store(Dispatcher)
let _collections = {}
let _collection = {}
let _items = {}
let _characteristics = {}

CollectionStore.all = function() {
  return _collections
}
CollectionStore.find = function(collectionId) {
  return _collections[collectionId]
}
function resetAllCollections(collections) {
  _collections = collections
}
function setCollection(data){
  _collections[collection.id] = data.collection
  _collection = data.collection
  _items = data.items
  _characteristics = data.characteristics
}
function removeCollection(id) {
  delete _collections[id]
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
      removeCollection(action.id);
      CollectionStore.__emitChange()
      break;
  }
}

module.exports = CollectionStore
