const React = require('react');
const Link = require('react-router').Link;
const CollectionStore = require("../stores/collection_store")

const Collection = React.createClass({
  getInitialState() {
    const collectionId = this.props.params.collectionId
    const collection = CollectionStore.find(collectionId) || {}
    return {
      collection: collection
    };
  },
  componentDidMount() {
    CollectionStore.addListener(this._collectionsChanged)
    CollectionActions.fetchAllCollections()
  },
  _collectionsChanged() {
    const collectionId = parseInt(this.props.params.collectionId)
    const collection = CollectionStore.find(collectionId)
    this.setState({ collection: collection })
  },
  render() {
    const collection = this.state.collection
    return (
      <div>
        <div className="header">
          <div>{collection.title}</div>
          <Link to={"collections/" + collection.id + "/edit"} className="edit">Edit</Link>
        </div>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Collection;
