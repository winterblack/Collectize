const React = require('react')
const Link = require('react-router').Link
const ItemStore = require("../stores/item_store")
const ItemActions = require("../actions/item_actions")

const ItemIndex = React.createClass({
  getInitialState() {
    return { items: ItemStore.all() }
  },
  componentWillReceiveProps(nextProps){
    ItemActions.fetchItems(nextProps.params)
  },
  componentWillMount: function() {
    this.itemListener = ItemStore.addListener(this.resetState)
  },
  componentWillUnmount() {
    this.itemListener.remove()
  },
  resetState() {
    this.setState({items: ItemStore.all()})
  },
  render() {
    let items = this.state.items
    let collection_id = this.props.params.collection_id
    return (
      <div className="item-index">
        {
          Object.keys(items).map( key => {
            let item = items[key]
            return (
              <Link to={"collections/" + collection_id + "/items/" + item.id}
                key={key} className="item-thumb">
                <img src={item.image_url}/>
              </Link>
            )
          })
        }
        <Link to={"collections/" + collection_id + "/newitem"}
          className="new-collection">+</Link>
      </div>
    )
  }

})

module.exports = ItemIndex
