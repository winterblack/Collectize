const React = require('react')
const Navbar = require("./navbar")

const App = React.createClass({

  render() {
    return (
      <div>
        <Navbar params={this.props.params}/>
        { this.props.children }
      </div>
    )
  }

})

module.exports = App
