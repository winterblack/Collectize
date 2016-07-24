const React = require('react')
const Link = require('react-router').Link
const hashHistory = require('react-router').hashHistory
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const ItemStore = require("../stores/item_store")
const ItemActions = require("../actions/item_actions")

const ItemForm = React.createClass({
  getInitialState() {
    console.log(this.props.route.path)
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let item = ItemStore.find(this.props.params.itemId) || {}
    item["collection_id"] = collection.id
    let characteristics = collection.characteristics || []
    let values = []
    for(let i = 0; i < characteristics.length; i++) {
      values.push({ characteristic_id: characteristics[i].id})
    }
    return {
      item,
      characteristics,
      values
    };
  },
  componentDidMount() {
    this.collectionListener = CollectionStore.addListener(this.resetState)
    this.itemListener = ItemStore.addListener(this.resetState)
    CollectionActions.fetchAllCollections()
    ItemActions.fetchItems(this.props.params.collectionId)
  },
  componentWillUnmount() {
    this.collectionListener.remove()
    this.itemListener.remove()
  },
  resetState() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let item = ItemStore.find(this.props.params.itemId) || {}
    item["collection_id"] = collection.id
    let characteristics = collection.characteristics || []
    let values = []
    for(let i = 0; i < characteristics.length; i++) {
      values.push({ characteristic_id: characteristics[i].id})
    }
    this.setState({
      item,
      characteristics,
      values
    })
  },
  submit(event) {
    event.preventDefault()
    if(this.props.route.path === "newitem") {
      this.createItem()
    } else {
      this.editItem()
    }
  },
  createItem() {
    ItemActions.createItem(this.state.item)
    hashHistory.push("collections/" + this.state.item.collection_id)
  },
  editItem() {
    ItemActions.editItem(this.state.item)
    hashHistory.push("collections/" + this.state.item.collection_id)
  },
  deleteItem() {
    ItemActions.deleteItem(this.state.item.id)
    hashHistory.push("collections/" + this.state.item.collection_id)
  },
  updateField(field) {
    return (event) => {
      let item = this.state.item
      item[field] = event.target.value
      this.setState({item})
    }
  },
  updateValues(key) {
    return (event) => {
      let values = this.state.values
      values[key].value = event.target.value
      this.setState({values})
    }
  },
  deleteButton() {
    if(this.props.route.path === "newitem"){return}
    return (
      <button onClick={this.deleteItem} className="delete-button">
        Delete
      </button>
    )
  },
  render() {
    let item = this.state.item
    let formName
    if(this.props.route.path === "newitem") {
      formName = "New Item"
    } else {
      formName = "Edit " + item.title
    }
    return (
      <div className="screen-fade">
        <div className="form-box">
          <form onSubmit={this.submit} className="collection-form">
            <div className="form-header">
              { formName }
              <Link to={"collections/" + this.state.item.collection_id} className="dismiss">X</Link>
            </div>
            <div className="row">
              <div className="label">Title</div>
              <input className="collection-field"
                type="text"
                onChange={this.updateField("title")}
                value={item.title || ""}/>
            </div>
            <div className="row">
              <div className="label">Image URL</div>
              <input className="collection-field"
                type="text"
                onChange={this.updateField("image_url")}
                value={item.image_url || ""}/>
            </div>
            {
              Object.keys(this.state.characteristics).map( key => {
                let characteristic = this.state.characteristics[key]
                return (
                  <div key={key} className="row">
                    <div className="label">{characteristic.name}</div>
                    <input className="collection-field"
                      type="text"
                      onChange={this.updateValues(key)}/>
                  </div>
                )
              })
            }
            <div className="collection-footer">
              <button className="save" type="submit">Save</button>
              { this.deleteButton() }
            </div>
          </form>
        </div>
      </div>
    )
  }

})

module.exports = ItemForm
