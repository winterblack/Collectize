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
    let user, session;
    let username = SessionStore.currentUser().username
    if (username) {
      user = <Link to={"users/" + SessionStore.currentUser().id} className="profile-link">{username}</Link>
      session = <input className="logout" type="submit" value="X" onClick={this._handleLogOut}/>
    } else {
      user = <Link to="signup" className="signup">Sign Up</Link>
      session = <Link to="login" className="login">Log In</Link>
    }
    return (
      <div className="navbar">
        <Link to="/" className="homepage-link">C</Link>
        <div className="search">Search</div>
        { user }
        { session }
      </div>
    )
  }

})

module.exports = Navbar
