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
const App = require("./components/app")
const Homepage = require("./components/homepage")
const LoginForm = require("./components/login_form")
//Auth
const SessionActions = require("./actions/session_actions")

window.SessionStore = require("./stores/session_store")

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Homepage } />
      <Route path="/login" component={ LoginForm }/>
      <Route path="/signup" component={ LoginForm }/>
    </Route>
  </Router>
)

$(document).ready(function() {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  const root = document.getElementById('root')
  ReactDOM.render(appRouter, root)
})
