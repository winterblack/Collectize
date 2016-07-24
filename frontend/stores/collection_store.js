const Store = require("flux/utils").Store
const Dispatcher = require("../dispatcher")
const CollectionStore = new Store(Dispatcher)

let _collections = {}

CollectionStore.all = function() {
  return _collections
}
CollectionStore.find = function(id) {
  return _collections[id]
}
function _resetCollections(collections) {
  _collections = collections
}
function _resetCollection(collection) {
  _collections[collection.id] = collection
}
function _removeCollection(id) {
  delete _collections[id]
}

CollectionStore.__onDispatch = function(action) {
  switch (action.type) {
    case "collections received":
      _resetCollections(action.collections);
      CollectionStore.__emitChange();
      break;
    case "collection received":
      _resetCollection(action.collection);
      CollectionStore.__emitChange();
      break;
    case "collection removed":
      _removeCollection(action.id);
      CollectionStore.__emitChange();
      break;
  }
}

module.exports = CollectionStore
