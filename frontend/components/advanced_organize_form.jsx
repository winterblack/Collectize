const React = require('react')
const CollectionStore = require("../stores/collection_store")
const CollectionActions = require("../actions/collection_actions")
const ItemIndex = require("./item_index")

const AdvancedOrganizeForm = React.createClass({
  getInitialState() {
    let collection = this.props.collection || {}
    return {
      collection_id: collection.id,
      filter: {}
    }
  },
  componentWillMount() {
    this.collectionListener = CollectionStore.addListener(this.resetState)
    CollectionActions.fetchAllCollections()
  },
  componentWillUnmount() {
    this.collectionListener.remove()
  },
  resetState() {
    let collection = this.props.collection || {}
    this.setState ({
      collection_id: collection.id,
      filter: {}
    })
  },
  toggleSelected(id, value) {
    return (event) => {
      let filterButton = $(event.target)
      let filter = this.state.filter
      if (filterButton.is(".selected")) {
        let characteristic = filter[id]
        let i = characteristic.indexOf(value)
        characteristic.splice(i, 1)
        filterButton.removeClass("selected")
      } else {
        if (filter[id]) {
          filter[id].push(value)
        } else {
          filter[id] = [value]
        }
        filterButton.addClass("selected")
      }
      this.setState({filter})
    }
  },
  render() {
    let characteristics = this.props.collection.characteristics || {}
    return (
      <div>
        <form className="organize-form">
          <div className="filter-column">
            <div className="organize-header">Filter</div>
            {
              Object.keys(characteristics).map( id => {
                let characteristic = characteristics[id]
                return (
                  <div key={id} className="organize-row">
                    <div className="label">
                      {characteristic.name}
                    </div>
                    <div className="filter-column">
                      <div className="organize-row">
                        {
                          characteristic.values.map( value => {
                            return (
                              <div key={value} className="value-filter"
                                onClick={this.toggleSelected(id, value)}>
                                {value}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </form>
        <ItemIndex params={this.state}/>
      </div>
    )
  }

})

module.exports = AdvancedOrganizeForm
