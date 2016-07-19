const React = require('react')
const SessionActions = require("../actions/session_actions")
const SessionStore = require("../stores/session_store")
const Link = require("react-router").Link
const hashHistory = require('react-router').hashHistory

const Navbar = React.createClass({
  _handleLogOut(){
    SessionActions.logOut()
  },
  render: function() {
    let profile = SessionStore.currentUser().username
    let login = "login"
    return (
      <div className="navbar">
        <Link to="/" className="homepage-link">C</Link>
        <div className="search">Search</div>
        <Link to={profile || login} className="profile-link">{profile}</Link>
        <input className="logout" type="submit" value="X" onClick={ this._handleLogOut } />
      </div>
    )
  }

})

module.exports = Navbar
