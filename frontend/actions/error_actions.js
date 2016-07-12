const AppDispatcher = require('../dispatcher');
const Constants = require('../constants');

const ErrorActions = {
  setErrors(form, errors) {
    AppDispatcher.dispatch({
      type: Constants.SET_ERRORS,
      form: form,
      errors: errors
    });
  },

  clearErrors() {
    AppDispatcher.dispatch({
      type: Constants.CLEAR_ERRORS
    });
  }
};

module.exports = ErrorActions;
