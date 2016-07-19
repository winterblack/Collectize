const React = require('react');
const SessionStore = require("../stores/session_store")
const CollectionIndex = require("./collection_index")
const Link = require("react-router").Link
const SessionActions = require("../actions/session_actions")

const Profile = React.createClass({
  getInitialState() {
    return {
      username: SessionStore.currentUser().username,
      collections: SessionStore.collections()
    }
  },
  componentDidMount() {
    SessionStore.addListener(this._handleChange)
  },
  _handleChange() {
    this.setState({
      collections: SessionStore.collections()
    })
  },
  render() {
    return (
      <div>
        <div className="profile-header">{this.state.username}</div>
        <CollectionIndex collections={this.state.collections}/>
        <Link to={this.state.username + "/newcollection"} className="collection-thumb new-collection">+</Link>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Profile;
