const Dispatcher = require('../dispatcher')
const Constants = require('../constants')
const SessionApiUtil = require('../util/session_api_util')
const ErrorActions = require('./error_actions')
const hashHistory = require('react-router').hashHistory

const SessionActions = {
  signUp(formData){
    SessionApiUtil.signUp(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors)
  },
  logIn(formData){
    SessionApiUtil.logIn(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors)
  },
  logOut() {
    SessionApiUtil.logOut(SessionActions.removeCurrentUser)
  },
  resetCurrentUser(){
    $.get("api/user", SessionActions.receiveCurrentUser)
  },
  receiveCurrentUser(currentUser) {
    Dispatcher.dispatch({
      type: Constants.LOGIN,
      currentUser: currentUser
    })
  },
  removeCurrentUser() {
    Dispatcher.dispatch({
      type: Constants.LOGOUT
    })
    hashHistory.push("/login")
  }
}

module.exports = SessionActions
