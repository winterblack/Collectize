const Dispatcher = require("../dispatcher")
const Store = require("flux/utils").Store

const SessionStore = new Store(Dispatcher)

let _currentUser = {}
let _collections = {}

SessionStore.currentUser = function() {
  return _currentUser
}
SessionStore.collections = function() {
  return _collections
}

function _resetCurrentUser(user) {
  _currentUser = user
  _collections = user.collections || {}
}
function _logout() {
  _currentUser = {}
}
function _resetCollection(collection) {
  _collections[collection.id] = collection
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
    case "collection received":
      _resetCollection(action.collection);
      SessionStore.__emitChange();
      break;
  }
}

module.exports = SessionStore
