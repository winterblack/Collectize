const Store = require('flux/utils').Store
const Dispatcher = require('../dispatcher')
const ItemStore = new Store(Dispatcher)
let _items = []

ItemStore.all = function() {
  return _items
}
ItemStore.find = function(id) {
  return _items[id]
}
function resetItems(items) {
  _items = items
}
function resetItem(item) {
  _items[item.id] = item
}
function removeItem(id) {
  delete _items[id]
}
ItemStore.__onDispatch = function(action) {
  switch(action.type) {
    case "items received":
      resetItems(action.items);
      ItemStore.__emitChange();
      break;
    case "item received":
      resetItem(action.item);
      ItemStore.__emitChange();
      break;
    case "item removed":
      removeItem(action.id);
      ItemStore.__emitChange;
      break;
  }
}

module.exports = ItemStore
