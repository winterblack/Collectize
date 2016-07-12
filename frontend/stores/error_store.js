const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher');
const Constants = require('../constants');
const ErrorStore = new Store(Dispatcher);

let _errors = {};
let _form = "";

function setErrors(action){
  _errors = action.errors;
  _form = action.form;
  ErrorStore.__emitChange();
}
function clearErrors(){
  _errors = {};
  _form = "";
  ErrorStore.__emitChange();
}
ErrorStore.__onDispatch = function (action) {
  switch (action.type) {
    case Constants.SET_ERRORS:
      setErrors(action);
      break;
    case Constants.CLEAR_ERRORS:
      clearErrors();
      break;
  }
};
ErrorStore.formErrors = function (form) {
  if (form !== _form) {
    return {};
  }
  const result = {};
  for (let field in _errors) {
    result[field] = Array.from(_errors[field]);
  }

  return result;
};
ErrorStore.form = function() {
  return _form;
};

module.exports = ErrorStore;
