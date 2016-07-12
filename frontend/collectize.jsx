//React
const React = require('react')
const ReactDOM = require('react-dom')
//Router
const ReactRouter = require('react-router')
const Router = ReactRouter.Router
const Route = ReactRouter.Route
const hashHistory = ReactRouter.hashHistory
const IndexRedirect = ReactRouter.IndexRedirect
//Components
const LoginForm = require("./components/login_form")
const SessionActions = require("./actions/session_actions")
const App = React.createClass({
  _handleLogOut(){
    SessionActions.logOut();
  },
  render() {
    return (
      <div>
        <input className="logout-button" type="submit" value="X" onClick={ this._handleLogOut } />
        { this.props.children }
      </div>
    );
  }
})

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRedirect to="/login" />
      <Route path="/login" component={ LoginForm }/>
      <Route path="/signup" component={ LoginForm }/>
    </Route>
  </Router>
)

$(document).ready(function() {
  const root = document.getElementById('root')
  ReactDOM.render(appRouter, root)
})
