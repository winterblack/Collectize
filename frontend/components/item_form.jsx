const React = require('react')
const Link = require('react-router').Link
const hashHistory = require('react-router').hashHistory
const ItemStore = require("../stores/item_store")
const ItemActions = require("../actions/item_actions")
const ValueActions = require("../actions/value_actions")

const ItemForm = React.createClass({
  getInitialState() {
    let item = ItemStore.find(this.props.params.itemId) || {}
    let values = item.values || this.newValues()
    return { item, values }
  },
  componentDidMount() {
    this.itemListener = ItemStore.addListener(this.resetState)
  },
  componentWillUnmount() {
    this.itemListener.remove()
  },
  resetState() {
    let item = ItemStore.find(this.props.params.itemId) || {}
    let values = item.values || this.newValues()
    this.setState({ item, values })
  },
  newValues() {
    let characteristics = this.props.collection.characteristics || []
    let values = []
    for(let i = 0; i < characteristics.length; i++) {
      values.push({
        characteristic_id: characteristics[i].id,
        value: ""
      })
    }
    return values
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
    let item = this.state.item
    item["collection_id"] = this.props.collection.id
    ItemActions.createItem(item, this.state.values)
    hashHistory.push("collections/" + this.props.collection.id)
  },
  editItem() {
    ItemActions.editItem(this.state.item)
    this.state.values.forEach( value => {
      ValueActions.editValue(value)
    })
    hashHistory.push("collections/" + this.props.collection.id)
  },
  deleteItem(event) {
    event.preventDefault()
    ItemActions.deleteItem(this.state.item.id)
    hashHistory.push("collections/" + this.props.collection.id)
  },
  updateField(field) {
    return (event) => {
      let item = this.state.item
      item[field] = event.target.value
      this.setState({item})
    }
  },
  updateValue(key) {
    return (event) => {
      let values = this.state.values
      values[key].value = event.target.value
      this.setState({values})
    }
  },
  deleteButton() {
    if(this.props.route.path === "newitem") {return}
    return (
      <button onClick={this.deleteItem} className="delete-button">
        Delete
      </button>
    )
  },
  values() {
    let values = this.state.values
    let characteristics = this.props.collection.characteristics || []
    if (values.length === characteristics.length) {
      return Object.keys(characteristics).map( key => {
        return (
          <div key={key} className="row">
            <div className="label">{characteristics[key].name}</div>
            <input className="collection-field"
              type="text"
              onChange={this.updateValue(key)}
              value={values[key].value}/>
          </div>
        )
      })
    }
  },
  render() {
    let item = this.state.item
    let characteristics = this.props.collection.characteristics || []
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
              <Link to={"collections/" + this.props.collection.id}
                className="dismiss">X</Link>
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
            { this.values() }
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
