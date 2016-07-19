const Dispatcher = require('../dispatcher')
const Store = require('flux/utils').Store
const Constants = require('../constants')

const SessionStore = new Store(Dispatcher)

let _currentUser = {}
let _collections = []

const _resetCurrentUser = function(currentUser) {
  _currentUser = currentUser
  _collections = currentUser.collections
}
const _logout = function() {
  _currentUser = {}
}
const _addCollection = function(collection) {
  _collections.push(collection)
}
SessionStore.__onDispatch = action => {
  switch(action.type) {
    case Constants.LOGIN:
      _resetCurrentUser(action.currentUser);
      SessionStore.__emitChange();
      break;
    case Constants.LOGOUT:
    	_logout()
      SessionStore.__emitChange();
      break;
    case Constants.COLLECTION_RECEIVED:
      _addCollection(action.collection);
      SessionStore.__emitChange()
      break;
  }
}
SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser)
}
SessionStore.isUserLoggedIn = function() {
  return !!_currentUser.id
}
SessionStore.collections = function() {
  return _collections.slice()
}

module.exports = SessionStore
