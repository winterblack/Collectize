const React = require('react')
const Link = require('react-router').Link
const CollectionActions = require("../actions/collection_actions")
const CollectionStore = require("../stores/collection_store")
const SessionStore = require("../stores/session_store")
const SessionActions = require("../actions/session_actions")
const hashHistory = require('react-router').hashHistory

const CollectionsForm = React.createClass({
  getInitialState: function() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    return {
      title: collection.title,
      user_id: SessionStore.currentUser().id
    }
  },
  componentDidMount: function() {
    CollectionStore.addListener(this._handleChange)
    CollectionActions.fetchAllCollections()
  },
  _handleChange: function() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    this.setState({
      title: collection.title
    })
  },
  createCollection(event) {
    event.preventDefault()
    CollectionActions.createCollection(this.state)
    hashHistory.push("users/" + this.state.user_id)
  },
  editCollection(event) {
    event.preventDefault()
    let id = this.props.params.collectionId
    let collection = {
      title: this.state.title,
      id: id
    }
    CollectionActions.editCollection(collection)
    hashHistory.push("users/" + this.state.user_id)
  },
  deleteCollection(event) {
    event.preventDefault()
    CollectionActions.deleteCollection(this.props.params.collectionId)
    hashHistory.push("users/" + this.state.user_id)
  },
  update(title) {
    return (event) => this.setState({[title]: event.target.value})
  },
  formType() {
    return this.props.route.path
  },
  render: function() {
    let formName, deleteButton, submit
    if (this.formType() === "edit") {
      submit = this.editCollection
      formName = "Edit " + this.state.title
      deleteButton = (
        <button onClick={this.deleteCollection} className="input">
          Delete
        </button>
      )
    } else {
      submit = this.createCollection
      formName = "New Collection"
      deleteButton = ""
    }
    return (
      <div className="screen-fade">
        <div className="form-box">
          <form onSubmit={ submit } className="collection-form">
            <div className="form-header">
              { formName }
              <Link to={"users/" + this.state.user_id} className="dismiss">X</Link>
            </div>
            <div className="row">
              <div className="label">Title</div>
              <input className="collection-field input input-field"
                type="text"
                onChange={this.update("title")}
                value={this.state.title}/>
            </div>
            <div className="row">
              <div className="label">Characteristics</div>
              <input className="collection-field input input-field"
                type="text"/>
            </div>
            <div className="collection-footer">
              <input className="input" type="submit" value="Save"/>
              { deleteButton }
            </div>
          </form>
        </div>
      </div>
    )
  }

})

module.exports = CollectionsForm
