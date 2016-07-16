const React = require('react')
const SessionActions = require("../actions/session_actions")
const SessionStore = require("../stores/session_store")
const Link = require("react-router").Link
const hashHistory = require('react-router').hashHistory;

const Navbar = React.createClass({
  _handleLogOut(){
    SessionActions.logOut();
  },
  render: function() {
    return (
      <div className="navbar">
        <div className="nav-center">
          <div className="search">Search</div>
          <div>{SessionStore.currentUser().username}</div>
          <input className="logout" type="submit" value="X" onClick={ this._handleLogOut } />
        </div>
      </div>
    )
  }

})

module.exports = Navbar
