const React = require('react')
const Link = require('react-router').Link
const hashHistory = require('react-router').hashHistory
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const CharacteristicActions = require("../actions/characteristic_actions")

const EditCollection = React.createClass({
  getInitialState: function() {
    let collection = CollectionStore.find(this.props.params.collectionId) || {}
    return {
      collection: collection,
      characteristics: collection.characteristics || [],
      new_characteristics: []
    };
  },
  componentDidMount: function() {
    CollectionStore.addListener(this._handleChange)
    CollectionActions.fetchAllCollections()
  },
  _handleChange() {
    let collection = CollectionStore.find(this.props.params.collectionId)
    this.setState({
      collection: collection,
      characteristics: collection.characteristics,
    })
  },
  submit(event) {
    event.preventDefault()
    CollectionActions.editCollection(this.state.collection)
    CharacteristicActions.createCharacteristics(
      this.state.new_characteristics,
      this.state.collection.id
    )
    CollectionActions.fetchAllCollections()
    hashHistory.push("collections/" + this.state.collection.id)
  },
  deleteCollection(event) {
    event.preventDefault()
    CollectionActions.deleteCollection(this.state.collection.id)
    hashHistory.push("users/" + this.state.collection.user_id)
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
  componentDidUpdate: function(prevProps, prevState) {
    if(this.fieldAdded) {
      $("input:last").select()
      this.fieldAdded = false
    }
  },
  render: function() {
    let collection = this.state.collection
    return (
      <div className="collection-screen">
        <div className="form-box">
          <form onSubmit={this.submit} className="collection-form">
            <div className="form-header">
              Edit {collection.title}
              <Link to={"collections/" + collection.id} className="dismiss">X</Link>
            </div>
            <div className="row">
              <div className="label">Title</div>
              <input className="collection-field"
                     type="text"
                     onChange={this.updateTitle()}
                     value={collection.title || ""}/>
            </div>
            <div className="row">
              <div className="label">Characteristics</div>
              <div className="column">
                {
                  Object.keys(this.state.characteristics).map( key => {
                    let characteristic = this.state.characteristics[key]
                    return (
                      <div key={key} className="label">
                        <button onClick={this.deleteCharacteristic} id={characteristic.id} className="input">X</button>
                        <span>{characteristic.name}</span>
                      </div>
                    )
                  })
                }
                {
                  Object.keys(this.state.new_characteristics).map( key => {
                    return <input className="collection-field"
                      type="text"
                      onChange={this.updateCharacteristic(key)}
                      value={this.state.new_characteristics[key].name || ""}
                      key={key}/>
                  })
                }
                <div className="add-characteristic"
                     onClick={this.addCharacteristic}/>
              </div>
            </div>
            <div className="collection-footer">
              <button className="input" type="submit">Save</button>
              <button onClick={this.deleteCollection} className="input">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = EditCollection;
