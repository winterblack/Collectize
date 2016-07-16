const React = require('react')
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const CollectionIndex = require("./collection_index")
const CollectionForm = require("./collection_form")

const Homepage = React.createClass({
  getInitialState() {
    return {
      collections: CollectionStore.all()
    };
  },
  componentDidMount() {
    CollectionStore.addListener(this._handleChange)
    CollectionActions.fetchAllCollections()
  },
  _handleChange() {
    this.setState({
      collections: CollectionStore.all()
    })
  },
  render() {
    return (
      <div>
        <CollectionIndex collections={this.state.collections}/>
      </div>
    )
  }

})

module.exports = Homepage
