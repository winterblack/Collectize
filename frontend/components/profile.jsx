const React = require('react')
const SessionStore = require("../stores/session_store")
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const CollectionIndex = require("./collection_index")

const Profile = React.createClass({
  getInitialState() {
    return {
      user: SessionStore.currentUser(),
      collections: CollectionStore.userCollections()
    };
  },
  componentDidMount() {
    CollectionStore.addListener(this.resetState)
    CollectionActions.fetchUserCollections()
  },
  resetState() {
    this.setState({
      collections: CollectionStore.userCollections()
    })
  },
  render() {
    return (
      <div>
        <div className="profile-header">{ this.state.user.username }</div>
        <CollectionIndex collections={ this.state.collections } />
        { this.props.children }
      </div>
    )
  }

})

module.exports = Profile
