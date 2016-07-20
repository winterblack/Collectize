const React = require('react')
const Link = require('react-router').Link;
const CollectionActions = require("../actions/collection_actions")

const CollectionIndex = React.createClass({
  render() {
    const collections = this.props.collections
    return (
      <div>
        {Object.keys(collections).map( key => {
          return (
            <Link to={ "collections/" + key }
                  className="collection-thumb"
                  key={ key }>
              { collections[key].title }
            </Link>
          )
        })}
      </div>
    )
  }
})

module.exports = CollectionIndex
