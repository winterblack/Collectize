const Dispatcher = require('../dispatcher');
const Constants = require('../constants');

const ItemActions = {
  createItem(item) {
    $.post('api/items', {item: item})
  },
  deleteItem(id) {
    $.ajax({ url: 'api/items/' + id, type: 'DELETE' })
  }
};

module.exports = ItemActions;
