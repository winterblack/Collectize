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
const Profile = require("./components/profile")
const NewCollection = require("./components/new_collection")
const EditCollection = require("./components/edit_collection")
const Collection = require("./components/collection")
const NewItem = require("./components/new_item")

const CollectionForm = require("./components/collection_form")
//Auth
const SessionActions = require("./actions/session_actions")
const SessionStore = require("./stores/session_store")

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="" component={ App }>
      <Route path="/" component={ Homepage }>
        <Route path="login" component={ LoginForm }/>
        <Route path="signup" component={ LoginForm }/>
      </Route>
      <Route path="users/:userId" component={ Profile }>
        <Route path="newcollection" component={ NewCollection }/>
      </Route>
      <Route path="collections/:collectionId" component={ Collection }>
        <Route path="edit" component={ EditCollection }/>
        <Route path="newitem" component={ NewItem }/>
      </Route>
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

window.CollectionStore = require("./stores/collection_store")
window.CollectionActions = require("./actions/collection_actions")
window.SessionStore = require("./stores/session_store")
window.SessionActions = require("./actions/session_actions")
