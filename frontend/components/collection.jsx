const React = require('react')
const Link = require('react-router').Link
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const OrganizeForm = require("./advanced_organize_form")

const Collection = React.createClass({
  getInitialState() {
    return {
      collection: CollectionStore.find(this.props.params.collectionId) || {}
    }
  },
  componentWillMount() {
    this.collectionListener = CollectionStore.addListener(this.resetState)
    CollectionActions.fetchCollections()
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
  editButton() {
    let collection = this.state.collection
    if (window.currentUser && window.currentUser.id == collection.user_id) {
      return (
        <Link to={"collections/" + collection.id + "/edit"} className="edit">
          Edit
        </Link>
      )
    }
  },
  render() {
    let collection = this.state.collection
    return (
      <div>
        <div className="collection-header">
          {collection.title}
          {this.editButton()}
        </div>
        <OrganizeForm collection={collection}/>
        { this.itemForm() }
      </div>
    )
  }

})

module.exports = Collection
