const React = require('react')
const hashHistory = require('react-router').hashHistory
const ItemActions = require("../actions/item_actions")

const EditItem = React.createClass({
  getInitialState: function() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let characteristics = collection.characteristics || []
    let values = []
    for(let i = 0; i < characteristics.length; i ++) {
      values.push({ characteristic_id: characteristics[i].id })
    }
    let item = CollectionStore.findItem(this.props.params.itemId) || {}
    return {
      item: item,
      characteristics: characteristics,
      values: values
    };
  },
  componentDidMount: function() {
    CollectionStore.addListener(this._handleChange)
    CollectionActions.fetchAllCollections()
  },
  _handleChange() {
    let collection = CollectionStore.find(this.props.params.collectionId)
    let characteristics = collection.characteristics
    let values = []
    for(let i = 0; i < characteristics.length; i ++) {
      values.push({ characteristic_id: characteristics[i].id })
    }
    let item = CollectionStore.findItem(this.props.params.itemId)
    this.setState({
      item: item,
      characteristics: characteristics,
      values: values
    })
  },
  submit(event) {
    event.preventDefault()
    ItemActions.editItem(this.state.item)
    CollectionActions.fetchAllCollections()
    hashHistory.push("collections/" + this.state.item.collection_id)
    },
  updateField(field) {
    return (event) => this.setState({[field]: event.target.value})
  },
  updateValues(key) {
    return (event) => {
      let values = this.state.values
      values[key].value = event.target.value
      this.setState({values: values})
    }
  },
  deleteItem(event) {
    event.preventDefault()
    ItemActions.deleteItem(thi.state.item.id)
    CollectionActions.fetchAllCollections()
    hashHistory.push("collections/" + this.state.item.collection_id)
  },
  render: function() {
    let item = this.state.item
    return (
      <div className="collection-screen">
        <div className="form-box">
          <form onSubmit={this.submit} className="collection-form">
            <div className="form-header">
              Edit {item.title}
            </div>
            <div className="row">
              <div className="label">Title</div>
              <input className="collection-field"
                     type="text"
                     onChange={this.updateField("title")}
                     value={this.state.title || ""}/>
            </div>
            <div className="row">
              <div className="label">Image URL</div>
              <input className="collection-field"
                     type="text"
                     onChange={this.updateField("image_url")}
                     value={this.state.image_url || ""}/>
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
              <button className="input" type="submit">Save</button>
                <button onClick={this.deleteItem} className="input">
                  Delete
                </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

})

module.exports = EditItem
