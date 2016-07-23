const React = require('react')
const Link = require('react-router').Link
const SessionStore = require("../stores/session_store")
const SessionActions = require("../actions/session_actions")

const Navbar = React.createClass({
  render() {
    let currentUser = SessionStore.currentUser()
    let user, session;
    if (currentUser.id) {
      user = <Link to={"users/" + currentUser.id} className="nav-profile">
        {currentUser.username}
      </Link>
      session = <button className="logout" onClick={SessionActions.logout}>X</button>
    } else {
      user = <Link to="signup" className="nav-signup">Sign Up</Link>
      session = <Link to="login" className="nav-login">Log In</Link>
    }
    return (
      <div className="navbar">
        <Link to="/" className="nav-home">C</Link>
        <input className="search-bar" type="text" placeholder="Search"/>
        { user }
        { session }
      </div>
    )
  }

})

module.exports = Navbar
