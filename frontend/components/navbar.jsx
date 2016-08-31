const React = require('react')
const Link = require('react-router').Link
const SessionStore = require("../stores/session_store")
const SessionActions = require("../actions/session_actions")
const CollectionActions = require("../actions/collection_actions")
const hashHistory = require('react-router').hashHistory

const Navbar = React.createClass({
  getInitialState: function() {
    return {
      search: ""
    }
  },
  search(event) {
    if (Object.keys(this.props.params).length > 0) {
      hashHistory.push("/")
    }
    this.setState(
      {search: event.target.value},
      () => {CollectionActions.fetchCollections(this.state)})
  },
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
        <input className="search-bar" type="text" placeholder="Search"
          onChange={this.search} value={this.state.search}/>
        { user }
        { session }
      </div>
    )
  }

})

module.exports = Navbar
