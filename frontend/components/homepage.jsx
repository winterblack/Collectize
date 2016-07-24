const React = require('react')
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const CollectionIndex = require("./collection_index")

const Homepage = React.createClass({
  getInitialState() {
    return {
      collections: CollectionStore.all()
    };
  },
  componentDidMount() {
    this.collectionListener = CollectionStore.addListener(this.resetState)
    CollectionActions.fetchAllCollections()
  },
  componentWillUnmount: function() {
    this.collectionListener.remove()
  },
  resetState() {
    this.setState({
      collections: CollectionStore.all()
    })
  },
  render() {
    return (
      <div>
        <CollectionIndex collections={this.state.collections}/>
        {this.props.children}
      </div>
    )
  }

})

module.exports = Homepage
