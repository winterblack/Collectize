const React = require('react')
const Link = require('react-router').Link
const CollectionActions = require("../actions/collection_actions")
const CollectionStore = require("../stores/collection_store")
const SessionStore = require("../stores/session_store")
const SessionActions = require("../actions/session_actions")
const hashHistory = require('react-router').hashHistory

const CollectionsForm = React.createClass({
  getInitialState() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    return {
      title: collection.title,
      user_id: SessionStore.currentUser().id,
      characteristics: collection.characteristics || [{}]
    }
  },
  componentDidMount() {
    CollectionStore.addListener(this._handleChange)
    CollectionActions.fetchAllCollections()
  },
  _handleChange() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    this.setState({
      title: collection.title,
      characteristics: collection.characteristics || [{}]
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
  updateTitle() {
    return (event) => this.setState({title: event.target.value})
  },
  updateCharacteristic(key) {
    return (event) => {
      let characteristics = this.state.characteristics
      characteristics[key].name = event.target.value
      this.setState({characteristics: characteristics})
    }
  },
  addCharacteristic() {
    let characteristics = this.state.characteristics
    characteristics.push({})
    this.setState({characteristics: characteristics})
    this.fieldAdded = true
  },
  componentDidUpdate(prevProps, prevState) {
    if(this.fieldAdded){
      $("input:last").select()
      this.fieldAdded = false
    }
  },
  formType() {
    return this.props.route.path
  },
  render() {
    let formName, deleteButton, submit, characteristics
    if (this.formType() === "edit") {
      submit = this.editCollection
      formName = "Edit " + this.state.title
      deleteButton = (
        <button onClick={this.deleteCollection} className="input">
          Delete
        </button>
      )
      characteristics = Object.keys(this.state.characteristics).map( key => {
        return <div className="" key={key}>
          {this.state.characteristics[key].name}
        </div>
      })
    } else {
      submit = this.createCollection
      formName = "New Collection"
      deleteButton = ""
      characteristics = Object.keys(this.state.characteristics).map( key => {
        return <input className="collection-field"
          type="text"
          onChange={this.updateCharacteristic(key)}
          value={this.state.characteristics[key].name}
          key={key}/>
      })
    }
    return (
      <div className="collection-screen">
        <div className="form-box">
          <form onSubmit={ submit } className="collection-form">
            <div className="form-header">
              { formName }
              <Link to={"users/" + this.state.user_id} className="dismiss">X</Link>
            </div>
            <div className="row">
              <div className="label">Title</div>
              <input className="collection-field"
                type="text"
                onChange={this.updateTitle()}
                value={this.state.title}/>
            </div>
            <div className="row">
              <div className="label">Characteristics</div>
              <div className="column">
                { characteristics }
                <div className="add-characteristic"
                     onClick={this.addCharacteristic}/>
              </div>
            </div>
            <div className="collection-footer">
              <button className="input " type="submit">Save</button>
              { deleteButton }
            </div>
          </form>
        </div>
      </div>
    )
  }

})

module.exports = CollectionsForm
