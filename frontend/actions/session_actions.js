const Dispatcher = require("../dispatcher")
const hashHistory = require("react-router").hashHistory
const ErrorActions = require("../actions/error_actions")

const SessionActions = {
  signup(credentials) {
    $.ajax({
      url: 'api/user',
      type: 'post',
      dataType: 'json',
      data: {user: credentials},
      success: SessionActions._receiveCurrentUser,
      error(xhr) { ErrorActions.setErrors(xhr.responseJSON) }
    })
  },
  login(credentials) {
    $.ajax({
      url: 'api/session',
      type: 'post',
      dataType: 'json',
      data: {user: credentials},
      success: SessionActions._receiveCurrentUser,
      error(xhr) { ErrorActions.setErrors(xhr.responseJSON)}
    })
  },
  logout() {
    $.ajax({
      url: 'api/session',
      type: 'delete',
      success: SessionActions._removeCurrentUser
    })
  },
  _receiveCurrentUser(user) {
    Dispatcher.dispatch({
      type: "login",
      user: user
    })
  },
  _removeCurrentUser() {
    Dispatcher.dispatch({
      type: "logout"
    })
    hashHistory.push("login")
  }
}

module.exports = SessionActions
