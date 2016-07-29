const React = require('react')
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const ItemIndex = require("./item_index")

const OrganizeForm = React.createClass({
  getInitialState() {
    let collection = this.props.collection || {}
    return {
      collection_id: collection.id,
      sort: "",
      order: "desc",
      filter: "",
      from: "",
      to: ""
    }
  },
  componentWillMount() {
    this.collectionListener = CollectionStore.addListener(this.resetState)
    CollectionActions.fetchAllCollections()
  },
  componentWillUnmount() {
    this.collectionListener.remove()
  },
  resetState() {
    let collection = this.props.collection || {}
    this.setState ({
      collection_id: collection.id,
      sort: "",
      direction: "desc",
      filter: "",
      from: "",
      to: ""
    })
  },
  update(field) {
    return (event) => this.setState({[field]: event.target.value})
  },
  toggleOrder(event) {
    event.preventDefault()
    if (this.state.order === "desc") {
      this.setState({order: "asc"})
    } else {
      this.setState({order: "desc"})
    }
  },
  render() {
    let characteristics = this.props.collection.characteristics || []
    return (
      <div>
        <form className="organize-form">
          <div className="sort-column">
            <div className="organize-header">Sort</div>
            <div className="organize-row">
              <select className="dropdown" onChange={this.update("sort")}>
                <option value="">none</option>
                {characteristics.map(characteristic => {
                  return <option key={"s" + characteristic.id} value={characteristic.id}>
                    {characteristic.name}
                  </option>
                })}
              </select>
              <button className="order" onClick={this.toggleOrder}>
                {this.state.order}
              </button>
            </div>
          </div>
          <div className="filter-column">
            <div className="organize-header">Filter</div>
            <div className="organize-row">
              <select className="dropdown" onChange={this.update("filter")}>
                <option value="">none</option>
                {characteristics.map(characteristic => {
                  return <option key={"f" + characteristic.id} value={characteristic.id}>
                    {characteristic.name}
                  </option>
                })}
              </select>
              <input className="filter-field" onChange={this.update("from")}/>
              To
              <input className="filter-field" onChange={this.update("to")}/>
            </div>
          </div>
        </form>
        <ItemIndex params={this.state}/>
      </div>
    )
  }

})

module.exports = OrganizeForm
