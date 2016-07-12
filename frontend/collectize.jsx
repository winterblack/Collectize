//React
const React = require('react')
const ReactDOM = require('react-dom')
//Router
const ReactRouter = require('react-router')
const Router = ReactRouter.Router
const Route = ReactRouter.Route
const hashHistory = ReactRouter.hashHistory
const IndexRoute = ReactRouter.IndexRoute
//Components
const LoginForm = require("./components/login_form")
const App = React.createClass({
  render() {
    return (
      <div> { this.props.children } </div>
    );
  }
})
const HelloWorld = React.createClass({
  render() {
    return (
      <div>Hello World</div>
    )
  }
})

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ HelloWorld }/>
      <Route path="/login" component={ LoginForm }/>
      <Route path="/signup" component={ LoginForm }/>
    </Route>
  </Router>
)

$(document).ready(function() {
  const root = document.getElementById('root')
  ReactDOM.render(appRouter, root)
})
