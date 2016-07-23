const Store = require("flux/utils").Store
const Dispatcher = require("../dispatcher")
const CollectionStore = new Store(Dispatcher)
const SessionStore = require("./session_store")

let _collections = []
let _userCollections = []
let _collection = {}

CollectionStore.all = function() {
  return _collections
}
CollectionStore.userCollections = function() {
  return _userCollections
}
CollectionStore.one = function() {
  return _collection
}
function resetCollections(collections) {
  _collections = collections
}
function resetUserCollections(collections) {
  _userCollections = collections
}
function resetCollection(collection) {
  _collection = collection
}

CollectionStore.__onDispatch = function(action) {
  switch (action.type) {
    case "collections received":
      resetCollections(action.collections);
      CollectionStore.__emitChange();
      break;
    case "user collections received":
      resetUserCollections(action.collections);
      CollectionStore.__emitChange();
      break;
    case "collection received":
      resetCollection(collection);
      CollectionStore.__emitChange();
      break;
    case "collection removed":
      CollectionStore.__emitChange();
      break;
  }
}

module.exports = CollectionStore
