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
    CollectionStore.addListener(this._handleChange)
    CollectionActions.fetchAllCollections()
  },
  _handleChange() {
    const collectionId = this.props.params.collectionId
    const collection = CollectionStore.find(collectionId)
    this.setState({ collection: collection })
  },
  render() {
    let collection = this.state.collection
    if(collection.id){
      var characteristics = collection.characteristics.map( characteristic => {
        return <li key={characteristic.id}>{characteristic.name}</li>
      })
    }
    return (
      <div>
        <div className="header">
          <div>{collection.title}</div>
          <Link to={"collections/" + collection.id + "/edit"} className="edit">Edit</Link>
        </div>
        <ul>
          { characteristics }
        </ul>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Collection;
