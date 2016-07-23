const Dispatcher = require("../dispatcher")
const Store = require("flux/utils").Store

const SessionStore = new Store(Dispatcher)

let _currentUser = {}

SessionStore.currentUser = function() {
  return _currentUser
}

function _resetCurrentUser(user) {
  _currentUser = user
}

function _logout() {
  _currentUser = {}
}

SessionStore.__onDispatch = function(action) {
  switch(action.type) {
    case "login":
      _resetCurrentUser(action.user);
      SessionStore.__emitChange();
      break;
    case "logout":
      _logout();
      SessionStore.__emitChange();
      break;
  }
}

module.exports = SessionStore
