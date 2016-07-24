const React = require('react')
const Link = require('react-router').Link

const CollectionIndex = React.createClass({

  render: function() {
    var collections = this.props.collections
    return (
      <ul>
        {
          Object.keys(collections).map( key => {
            return (
              <Link to={"collections/" + key} key={key}
                className="collection-thumb">
                { collections[key].title}
               </Link>
            )
          })
        }
      </ul>
    )
  }

})

module.exports = CollectionIndex
