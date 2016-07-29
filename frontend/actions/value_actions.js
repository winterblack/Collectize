const Dispatcher = require('../dispatcher')

const ValueActions = {
  createValues(values, item_id) {
    values.forEach( value => {
      value["item_id"] = item_id
      ValueActions.createValue(value)
    })
  },
  createValue(value) {
    $.post('api/values', {value})
  },
  editValue(value) {
    $.ajax({
      url: 'api/values/' + value.id,
      type: "patch",
      data: {value},
    })
  }
}

module.exports = ValueActions
