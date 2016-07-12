const Dispatcher = require('../dispatcher')
const Store = require('flux/utils').Store
const Constants = require('../constants')

const SessionStore = new Store(Dispatcher)

let _currentUser = {}
let _currentUserHasBeenFetched = false

const _login = function(currentUser) {
  _currentUser = currentUser
  _currentUserHasBeenFetched = true
}
const _logout = function() {
  _currentUser = {}
  _currentUserHasBeenFetched = true
}
SessionStore.__onDispatch = action => {
  switch(action.type) {
    case Constants.LOGIN:
      _login(action.currentUser);
      SessionStore.__emitChange();
      break;
    case Constants.LOGOUT:
    	_logout()
      SessionStore.__emitChange();
      break;
  }
}
SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser)
}
SessionStore.currentUserHasBeenFetched = function () {
  return !!_currentUserHasBeenFetched
}
SessionStore.isUserLoggedIn = function() {
  return !!_currentUser.id
}

module.exports = SessionStore
