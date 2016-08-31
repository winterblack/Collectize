const Dispatcher = require('../dispatcher');
const ValueActions = require("./value_actions")
const CollectionActions = require("./collection_actions")
const hashHistory = require('react-router').hashHistory

const ItemActions = {
  fetchItems(organize) {
    $.get('api/items', {organize}, ItemActions._receiveItems)
  },
  createItem(item, values) {
    $.post('api/items', {item}, (response) => {
      ItemActions._receiveItem(response)
      ValueActions.createValues(values, response.id)
    })
  },
  deleteItem(id) {
    $.ajax({
      url: 'api/items/' + id,
      type: 'DELETE',
      data: {id},
      success: ItemActions._removeItem(id)
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
    CollectionActions.fetchCollections()
  },
  _removeItem(id) {
    Dispatcher.dispatch({
      type: "item removed",
      id
    })
  }
};

module.exports = ItemActions;
