const Store = require('flux/utils').Store
const Dispatcher = require('../dispatcher')
const ItemStore = new Store(Dispatcher)
let _items = []

ItemStore.all = function() {
  return _items
}
ItemStore.find = function(id) {
  for (let i = 0; i < _items.length; i++) {
    if (_items[i].id == id) {
      return _items[i]
    }
  }
}
function resetItems(items) {
  _items = items
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
      ItemStore.__emitChange();
      break;
    case "item removed":
      removeItem(action.id);
      ItemStore.__emitChange();
      break;
  }
}

module.exports = ItemStore
