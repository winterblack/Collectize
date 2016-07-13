const React = require('react');
const CollectionActions = require("../actions/collection_actions")

const CollectionsForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      user_id: window.currentUser.id
    };
  },
  handleSubmit(event) {
    event.preventDefault()
    const collection = Object.assign({}, this.state )
    CollectionActions.createCollection(collection)
  },
  update(property) {
    return (event) => this.setState({[property]: event.target.value})
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input className="login-input login-field"
               type="text"
               onChange={this.update("title")}/>
        <input className="login-input login-field" type="submit"/>
      </form>
    );
  }

});

module.exports = CollectionsForm;
