const Dispatcher = require("../dispatcher")

const ErrorActions = {
  setErrors(errors) {
    Dispatcher.dispatch({
      type: "set errors",
      errors: errors
    })
  }
}

module.exports = ErrorActions
