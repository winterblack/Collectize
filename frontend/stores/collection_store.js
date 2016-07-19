const Store = require('flux/utils').Store
const Constants = require('../constants')
const Dispatcher = require('../dispatcher')
const CollectionStore = new Store(Dispatcher)
let _collections = []

CollectionStore.all = function(){
  return _collections.slice()
}
function resetAllCollections(collections){
  _collections = collections
  CollectionStore.__emitChange()
}
function addCollection(collection){
  _collections.push(collection)
  CollectionStore.__emitChange()
}
CollectionStore.__onDispatch = function(action) {
  switch(action.type) {
    case Constants.COLLECTIONS_RECEIVED:
      resetAllCollections(action.collections);
      break;
    case Constants.COLLECTION_RECEIVED:
      addCollection(action.collection);
      break;
  }
}

module.exports = CollectionStore
