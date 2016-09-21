const React = require('react')
const Link = require('react-router').Link

const CollectionIndex = React.createClass({
  render: function() {
    var collections = this.props.collections
    return (
      <ul>
        {
          Object.keys(collections).map( key => {
            let collection = collections[key]
            let i = 0
            let preview = collection.preview || []
            return (
              <Link to={"collections/" + key} key={key}
                className="thumb">
                <div className="collection-thumb">
                  {
                    preview.map( image => {
                    i++
                    return (
                      <img key={i} src={image} className="preview"/>
                    )
                  })
                }
                </div>
                <div className="title">{collection.title}</div>
               </Link>
            )
          })
        }
      </ul>
    )
  }

})

module.exports = CollectionIndex
