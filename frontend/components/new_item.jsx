const React = require('react')
const hashHistory = require('react-router').hashHistory
const ItemActions = require("../actions/item_actions")

const NewItem = React.createClass({
  getInitialState: function() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let characteristics = collection.characteristics || []
    let values = []
    for(let i = 0; i < characteristics.length; i ++) {
      values.push({ characteristic_id: characteristics[i].id })
    }
    return {
      title: "",
      image_url: "",
      collection_id: collection.id,
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
    this.setState({
      collection_id: collection.id,
      characteristics: characteristics,
      values: values
    })
  },
  submit(event) {
    event.preventDefault()
    ItemActions.createItem(this.state)
    CollectionActions.fetchAllCollections()
    hashHistory.push("collections/" + this.state.collection_id)
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
  render: function() {
    return (
      <div className="collection-screen">
        <div className="form-box">
          <form onSubmit={this.submit} className="collection-form">
            <div className="form-header">
              New Item
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
            </div>
          </form>
        </div>
      </div>
    )
  }

})

module.exports = NewItem
