const Store = require("flux/utils").Store
const Dispatcher = require("../dispatcher")
const ErrorStore = new Store(Dispatcher)

let _errors = {}

function setErrors(errors) {
  _errors = errors
}

ErrorStore.errors = function() {
  return _errors
}

ErrorStore.clearErrors = function() {
  _errors = {}
}

ErrorStore.__onDispatch = function(action) {
  switch (action.type) {
    case "set errors":
      setErrors(action.errors)
      ErrorStore.__emitChange()
      break;
  }
}

module.exports = ErrorStore
