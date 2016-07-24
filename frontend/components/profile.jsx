const React = require('react')
const Link = require ('react-router').Link
const SessionStore = require("../stores/session_store")
const SessionActions = require("../actions/session_actions")
const CollectionIndex = require("./collection_index")

const Profile = React.createClass({
  getInitialState() {
    return {
      user: SessionStore.currentUser(),
      collections: SessionStore.collections()
    };
  },
  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.resetState)
    SessionActions.resetCurrentUser()
  },
  componentWillUnmount: function() {
    this.sessionListener.remove()
  },
  resetState() {
    this.setState({
      collections: SessionStore.collections()
    })
  },
  render() {
    return (
      <div>
        <div className="profile-header">{ this.state.user.username }</div>
        <CollectionIndex collections={ this.state.collections } />
        <Link to={"users/" + this.state.user.id + "/newcollection"}
          className="new-collection">+</Link>
        { this.props.children }
      </div>
    )
  }

})

module.exports = Profile
