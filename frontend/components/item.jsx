const React = require('react')
const Link = require('react-router').Link
const ItemStore = require("../stores/item_store")
const ItemActions = require("../actions/item_actions")
const hashHistory = require('react-router').hashHistory

const ItemForm = React.createClass({
  getInitialState() {
    let item = ItemStore.find(this.props.params.itemId) || {}
    let values = item.values || {}
    return { item, values }
  },
  componentWillReceiveProps(nextProps) {
    let collection_id = nextProps.collection.id
    this.itemListener = ItemStore.addListener(this.resetState)
    ItemActions.fetchItems( {collection_id} )
  },
  componentWillUnmount() {
    this.itemListener.remove()
  },
  resetState() {
    let item = ItemStore.find(this.props.params.itemId) || {}
    let values = item.values || {}
    this.setState({ item, values })
  },
  values() {
    let values = this.state.values
    let characteristics = this.props.collection.characteristics || {}
    if (Object.keys(values).length > 0) {
      return Object.keys(characteristics).map( key => {
        return (
          <div key={key} className="row">
            <div className="label">{characteristics[key].name}</div>
            <div className="value">{values[key].value}</div>
          </div>
        )
      })
    }
  },
  editButton() {
    let collection = this.props.collection
    let item = this.state.item
    if(window.currentUser && window.currentUser.id == collection.user_id) {
      return (
        <Link to={"collections/" + collection.id + "/items/" + item.id + "/edit"}
          className="edit">
          Edit
        </Link>
      )
    }
  },
  render() {
    let item = this.state.item
    let characteristics = this.props.collection.characteristics || []
    let collection_id = this.props.collection.id
    return (
      <div className="screen-fade">
        <div className="form-box">
          <div className="form-header">
            { item.title }
            { this.editButton() }
            <Link to={"collections/" + collection_id}
              className="dismiss">X</Link>
          </div>
          <div className="row">
            <div className="label">Title</div>
            <div className="value">{item.title || ""}</div>
          </div>
          <div className="row">
            <div className="label">Image URL</div>
            <a href={item.image_url} className="value link">{item.title}</a>
          </div>
          { this.values() }
          <div className="collection-footer"/>
        </div>
      </div>
    )
  }

})

module.exports = ItemForm
