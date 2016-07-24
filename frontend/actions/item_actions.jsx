const Dispatcher = require('../dispatcher');

const ItemActions = {
  fetchItems(collection_id) {
    $.get('api/items', {collection_id}, ItemActions._receiveItems)
  },
  createItem(item) {
    $.post('api/items', {item}, ItemActions._receiveItem)
  },
  deleteItem(id) {
    $.ajax({
      url: 'api/items/' + id,
      type: 'DELETE',
      data: {id},
      success: ItemActions._removeItem
    })
  },
  editItem(item) {
    $.ajax({
      url: 'api/items/' + item.id,
      type: 'PATCH',
      data: {item},
      success: ItemActions._receiveItem
    })
  },
  _receiveItems(items) {
    Dispatcher.dispatch({
      type: "items received",
      items
    })
  },
  _receiveItem(item) {
    Dispatcher.dispatch({
      type: "item received",
      item
    })
  },
  _removeItem(id) {
    Dispatcher.dispatch({
      type: "item removed",
      id
    })
  }
};

module.exports = ItemActions;
