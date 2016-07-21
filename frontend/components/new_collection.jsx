const React = require('react')
const hashHistory = require('react-router').hashHistory
const Link = require('react-router').Link
const CollectionActions = require("../actions/collection_actions")

const NewCollection = React.createClass({
  getInitialState: function() {
    return {
      user_id: this.props.params.userId,
      title: "",
      characteristics: [{}]
    };
  },
  submit(event) {
    event.preventDefault()
    CollectionActions.createCollection(this.state)
    hashHistory.push("users/" + this.state.userId)
  },
  updateTitle() {
    return (event) => this.setState({title: event.target.value})
  },
  updateCharacteristic(key) {
    return (event) => {
      let characteristics = this.state.characteristics
      characteristics[key].name = event.target.value
      this.setState({characteristics: characteristics})
    }
  },
  addCharacteristic() {
    let characteristics = this.state.characteristics
    characteristics.push({})
    this.setState({characteristics: characteristics})
    this.fieldAdded = true
  },
  componentDidUpdate: function(prevProps, prevState) {
    if(this.fieldAdded) {
      $("input:last").select()
      this.fieldAdded = false
    }
  },
  render: function() {
    return (
      <div className="collection-screen">
        <div className="form-box">
          <form onSubmit={this.submit} className="collection-form">
            <div className="form-header">
              New Collection
              <Link to={"users/" + this.state.userId} className="dismiss">X</Link>
            </div>
            <div className="row">
              <div className="label">Title</div>
              <input className="collection-field"
                   type="text"
                   onChange={this.updateTitle()}
                   value={this.state.title || ""}/>
            </div>
            <div className="row">
              <div className="label">Characteristics</div>
              <div className="column">
                {
                  Object.keys(this.state.characteristics).map( key => {
                    return <input className="collection-field"
                      type="text"
                      onChange={this.updateCharacteristic(key)}
                      value={this.state.characteristics[key].name || ""}
                      key={key}/>
                  })
                }
                <div className="add-characteristic"
                     onClick={this.addCharacteristic}/>
              </div>
            </div>
            <div className="collection-footer">
              <button className="input" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = NewCollection;
