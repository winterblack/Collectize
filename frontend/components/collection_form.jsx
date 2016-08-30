const React = require('react')
const hashHistory = require('react-router').hashHistory
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const CharacteristicActions = require("../actions/characteristic_actions")

const CollectionForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    return {
      collection,
      characteristics: collection.characteristics || [],
      new_characteristics: []
    };
  },
  componentDidMount() {
    if(this.props.route.path === "edit") {
      this.collectionListener = CollectionStore.addListener(this.resetState)
      CollectionActions.fetchAllCollections()
    }
  },
  componentWillUnmount() {
    if(this.collectionListener) {
      this.collectionListener.remove()
    }
  },
  resetState() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    this.setState({
      collection,
      characteristics: collection.characteristics
    })
  },
  submit(event) {
    event.preventDefault()
    if(this.props.route.path === "edit") {
      this.editCollection()
    } else {
      this.createCollection()
    }
  },
  createCollection() {
    let userId = this.props.params.userId
    let collection = this.state.collection
    collection["user_id"] = userId
    collection["characteristics"] = this.state.new_characteristics
    CollectionActions.createCollection(collection)
    this.context.router.goBack()
  },
  editCollection() {
    CollectionActions.editCollection(this.state.collection)
    CharacteristicActions.createCharacteristics(
      this.state.new_characteristics,
      this.state.collection
    )
    CollectionActions.fetchAllCollections()
    this.context.router.goBack()
  },
  deleteCollection(event) {
    event.preventDefault()
    CollectionActions.deleteCollection(this.state.collection.id)
    this.context.router.push("users/" + this.state.collection.user_id)
  },
  updateTitle() {
    return (event) => {
      let collection = this.state.collection
      collection["title"] = event.target.value
      this.setState({collection: collection})
    }
  },
  updateCharacteristic(key) {
    return (event) => {
      let new_characteristics = this.state.new_characteristics
      new_characteristics[key].name = event.target.value
      this.setState({new_characteristics: new_characteristics})
    }
  },
  addCharacteristic() {
    let new_characteristics = this.state.new_characteristics
    new_characteristics.push({})
    this.setState({new_characteristics: new_characteristics})
    this.fieldAdded = true
  },
  deleteCharacteristic(event) {
    event.preventDefault()
    CharacteristicActions.deleteCharacteristic(event.target.id)
    CollectionActions.fetchAllCollections()
  },
  componentDidUpdate(prevProps, prevState) {
    if(this.fieldAdded) {
      $("input:last").select()
      this.fieldAdded = false
    }
  },
  deleteButton() {
    if(this.props.route.path === "edit") {
      return (
        <button onClick={this.deleteCollection} className="delete-button">
          Delete
        </button>
      )
    }
  },
  render() {
    let formName;
    let collection = this.state.collection
    let characteristics = this.state.characteristics || {}
    if(this.props.route.path === "edit") {
      formName = "Edit " + collection.title
    } else {
      formName = "New Collection"
    }
    return (
      <div className="collection-screen">
        <form onSubmit={this.submit} className="collection-form">
          <div className="form-header">
            { formName }
            <div onClick={this.context.router.goBack} className="dismiss">X</div>
          </div>
          <div className="row">
            <div className="label">Title</div>
            <input className="collection-field"
              type="text"
              onChange={this.updateTitle()}
              value={collection.title || ""}/>
          </div>
          <div className="row">
            <div className="column">
              <div className="label">Characteristics</div>
            </div>
            <div className="column">
              {
                Object.keys(characteristics).map( id => {
                  return (
                    <div key={id} className="characteristic-row">
                      <div id={id} className="delete-characteristic"
                        onClick={this.deleteCharacteristic}>X</div>
                      <div className="characteristic">
                        {characteristics[id].name}
                      </div>
                    </div>
                  )
                })
              }
              {
                Object.keys(this.state.new_characteristics).map( key => {
                  return (
                    <input className="collection-field"
                      type="text"
                      onChange={this.updateCharacteristic(key)}
                      value={this.state.new_characteristics[key].name || ""}
                      key={key}/>
                  )
                })
              }
              <div onClick={this.addCharacteristic}
                className="add-characteristic"/>
            </div>
          </div>
          <div className="collection-footer">
            <button className="save" type="submit">Save</button>
            { this.deleteButton() }
          </div>
        </form>
      </div>
    )
  }

})

module.exports = CollectionForm
