const React = require('react')

const CollectionIndex = React.createClass({

  render: function() {
    return (
      <ul>
        {
          this.props.collections.map( collection => {
            return (
              <li className="collection-thumb" key={ collection.id }>
                { collection.title }
              </li>
            )
          })
        }
      </ul>
    )
  }

})

module.exports = CollectionIndex
