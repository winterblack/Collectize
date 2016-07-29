const React = require('react')
const Link = require('react-router').Link
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const ItemStore = require("../stores/item_store")
const ItemActions = require("../actions/item_actions")
const OrganizeForm = require("./organize_form")
const ItemIndex = require("./item_index")

const Collection = React.createClass({
  getInitialState() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let items = ItemStore.all()
    return { collection, items, params: {} }
  },
  componentDidMount() {
    this.itemListener = ItemStore.addListener(this.resetState)
    CollectionActions.fetchAllCollections()
    ItemActions.fetchItems(this.props.params.collectionId)
  },
  componentWillUnmount() {
    this.itemListener.remove()
  },
  resetState() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    let characteristics = collection.characteristics || [{}]
    let items = ItemStore.all()
    let firstChar = characteristics[0].id
    this.setState({ collection, items, params: {sort: firstChar, filter: firstChar} })
  },
  updateParams(field) {
    return (event) => {
      let params = this.state.params
      params[field] = parseInt(event.target.value)
      this.setState({params})
    }
  },
  submit() {
    ItemActions.fetchItems(this.state.collection.id, this.state.params)
  },
  itemForm() {
    if (this.props.children) {
      return React.cloneElement(this.props.children, {collection: this.state.collection})
    }
  },
  render() {
    let collection = this.state.collection
    let characteristics = collection.characteristics || []
    return (
      <div>
        <div className="collection-header">
          {collection.title}
          <Link to={"collections/" + collection.id + "/edit"} className="edit">
            Edit
          </Link>
        </div>
        <form className="organize-form" onSubmit={this.submit}>
          <div className="sort-column">
            <div className="organize-header">Sort</div>
            <div className="organize-row">
              <select className="dropdown" onChange={this.updateParams("sort")}>
                {characteristics.map(characteristic => {
                  return <option key={"s" + characteristic.id} value={characteristic.id}>
                    {characteristic.name}
                  </option>
                })}
              </select>
              <button className="sort-by">abc</button>
            </div>
          </div>
          <div className="filter-column">
            <div className="organize-header">Filter</div>
            <div className="organize-row">
              <select className="dropdown" onChange={this.updateParams("filter")}>
                {characteristics.map(characteristic => {
                  return <option key={"f" + characteristic.id} value={characteristic.id}>
                    {characteristic.name}
                  </option>
                })}
              </select>
              <input className="filter-field" onChange={this.updateParams("from")}/>
              To
              <input className="filter-field" onChange={this.updateParams("to")}/>
            </div>
            <button className="save" type="submit">Go</button>
          </div>
        </form>
        <ItemIndex items={this.state.items} collection={collection}/>
        { this.itemForm() }
      </div>
    )
  }

})

module.exports = Collection
