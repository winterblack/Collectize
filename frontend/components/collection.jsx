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
        return <li className="item" key={characteristic.id}>{characteristic.name}</li>
      })
      var items = collection.items.map( item => {
        return <Link to={"collections/" + collection.id + "/items/" + item.id}
                    className="item-thumb"
                    key={item.id}>
          <img src={item.image_url}/>
        </Link>
      })
    }
    return (
      <div>
        <div className="header">
          <div>{collection.title}</div>
          <Link to={"collections/" + collection.id + "/edit"} className="edit">Edit</Link>
        </div>
        <ul className="list">
          { characteristics }
        </ul>
        <div>
          { items }
        </div>
        <Link to={"collections/" + this.state.collection.id + "/newitem"}
          className="item-thumb new-item">+</Link>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Collection;
