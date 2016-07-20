const React = require('react')
const Link = require('react-router').Link;
const CollectionActions = require("../actions/collection_actions")
const CollectionStore = require("../stores/collection_store")
const SessionStore = require("../stores/session_store")
const SessionActions = require("../actions/session_actions")
const hashHistory = require('react-router').hashHistory

const CollectionsForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    let collectionId = this.props.params.collectionId
    let collection = CollectionStore.find(collectionId) || {}
    return {
      title: "",
      user_id: SessionStore.currentUser().id,
      collection: collection
    }
  },
  componentDidMount: function() {
    CollectionStore.addListener(this._handleChange)
    CollectionActions.fetchAllCollections()
  },
  _handleChange: function() {
    let collectionId = this.props.params.collectionId
    let collection = CollectionStore.find(collectionId)
    this.setState({ collection: collection })
  },
  handleSubmit(event) {
    event.preventDefault()
    delete this.state.collection
    const collection = Object.assign({}, this.state )
    CollectionActions.createCollection(collection)
    hashHistory.push("users/" + collection.user_id)
  },
  update(title) {
    return (event) => this.setState({[title]: event.target.value})
  },
  formType() {
    return this.props.route.path
  },
  delete(event) {
    event.preventDefault()
    CollectionActions.deleteCollection(this.state.collection.id)
    hashHistory.push("users/" + this.state.collection.user_id)
  },
  render: function() {
    let formName, deleteButton;
    if (this.formType() === "edit") {
      formName = "Edit " + this.state.collection.title
      deleteButton = (
        <button onClick={this.delete} className="input">
          Delete
        </button>
      )
    } else {
      formName = "New Collection"
      deleteButton = ""
    }
    return (
      <div className="screen-fade">
        <div className="form-box">
          <form onSubmit={this.handleSubmit} className="collection-form">
            <div className="form-header">
              { formName }
              <div className="dismiss" onClick={this.context.router.goBack}>X</div>
            </div>
            <div className="row">
              <div className="label">Title</div>
              <input className="collection-field input input-field"
                type="text"
                onChange={this.update("title")}/>
            </div>
            <div className="row">
              <div className="label">Characteristics</div>
              <input className="collection-field input input-field"
                type="text"/>
            </div>
            <div className="collection-footer">
              { deleteButton }
              <input className="input" type="submit" value="Save"/>
            </div>
          </form>
        </div>
      </div>
    )
  }

})

module.exports = CollectionsForm
