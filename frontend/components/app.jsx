const React = require('react')
const SessionActions = require("../actions/session_actions")
const Navbar = require("./navbar")

const App = React.createClass({

  render() {
    return (
      <div>
        <Navbar />
        { this.props.children }
      </div>
    )
  }
})

module.exports = App
