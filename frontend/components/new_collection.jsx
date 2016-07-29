const React = require('react')
const Link = require('react-router').Link
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const OrganizeForm = require("./organize_form")

const Collection = React.createClass({
  getInitialState() {
    return {
      collection: CollectionStore.find(this.props.params.collectionId) || {}
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
    this.setState({
      collection: CollectionStore.find(this.props.params.collectionId) || {}
    })
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    let path = this.props.route.path
    if (path === "edit" || path === "newitem") {
      return false
    } else {
      return true
    }
  },
  itemForm() {
    if (this.props.children) {
      return React.cloneElement(this.props.children, {collection: this.state.collection})
    }
  },
  render() {
    let collection = this.state.collection
    return (
      <div>
        <div className="collection-header">
          {collection.title}
          <Link to={"collections/" + collection.id + "/edit"} className="edit">
            Edit
          </Link>
        </div>
        <OrganizeForm collection={collection}/>
        { this.itemForm() }
      </div>
    )
  }

})

module.exports = Collection
