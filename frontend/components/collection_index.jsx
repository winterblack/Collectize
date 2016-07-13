const React = require('react')
const CollectionActions = require("../actions/collection_actions")

const CollectionIndex = React.createClass({
  render() {
    return (
      <div>
        <ul>
          {this.props.collections.map( collection => {
            return<li key={collection.id}>{collection.title}</li>
          })}
        </ul>
      </div>
    )
  }
})

module.exports = CollectionIndex
