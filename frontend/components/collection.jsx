const React = require('react')
const Link = require('react-router').Link
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const ItemStore = require("../stores/item_store")
const ItemActions = require("../actions/item_actions")

const Collection = React.createClass({
  getInitialState: function() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let items = ItemStore.all()
    return {
      collection,
      items
    };
  },
  componentDidMount: function() {
    this.collectionListener = CollectionStore.addListener(this.resetState)
    this.itemListener = ItemStore.addListener(this.resetState)
    CollectionActions.fetchAllCollections()
    ItemActions.fetchItems(this.props.params.collectionId)
  },
  componentWillUnmount: function() {
    this.collectionListener.remove()
    this.itemListener.remove()
  },
  resetState() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let items = ItemStore.all()
    this.setState({
      collection,
      items
    })
  },
  render: function() {
    let collection = this.state.collection
    let characteristics;
    if(collection.id) {
      characteristics = collection.characteristics.map( characteristic => {
        return <li className="item" key={characteristic.id}>{characteristic.name}</li>
      })
    }
    return (
      <div>
        <div className="collection-header">
          {collection.title}
          <Link to={"collections/" + collection.id + "/edit"} className="edit">
            Edit
          </Link>
        </div>
        <ul className="list">
          { characteristics }
        </ul>
        <div>
          {
            Object.keys(this.state.items).map( key => {
              return (
                <Link to={"collections/" + collection.id + "/items/" + key}
                  key={key} className="item-thumb">
                  <img src={this.state.items[key].image_url}/>
                </Link>
              )
            })
          }
        </div>
        <Link to={"collections/" + this.state.collection.id + "/newitem"}
          className="new-collection">+</Link>
        {this.props.children}
      </div>
    )
  }

})

module.exports = Collection
