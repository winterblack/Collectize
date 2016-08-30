// React
const React = require('react')
const ReactDOM = require('react-dom')
// Router
const ReactRouter = require('react-router')
const Router = ReactRouter.Router
const Route = ReactRouter.Route
const hashHistory = ReactRouter.hashHistory
// Auth
const SessionActions = require("./actions/session_actions")
// Components
const App = require("./components/app")
const Homepage = require("./components/homepage")
const LoginForm = require("./components/login_form")
const Profile = require("./components/profile")
const CollectionForm = require("./components/collection_form")
const Collection = require("./components/collection")
const ItemForm = require("./components/item_form")
const Item = require("./components/item")

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="" component={ App }>
      <Route path="/" component={ Homepage }>
        <Route path="login" component={ LoginForm }/>
        <Route path="signup" component={ LoginForm }/>
      </Route>
      <Route path="users/:userId" component={ Profile }>
        <Route path="newcollection" component={ CollectionForm }/>
      </Route>
      <Route path="collections/:collectionId" component={ Collection }>
        <Route path="edit" component={ CollectionForm }/>
        <Route path="newitem" component={ ItemForm }/>
        <Route path="items/:itemId" component={ Item }/>
        <Route path="items/:itemId/edit" component={ ItemForm }/>
      </Route>
    </Route>
  </Router>
)

$(document).ready(function() {
  if (window.currentUser) {
    SessionActions._receiveCurrentUser(window.currentUser)
  }
  ReactDOM.render(appRouter, document.getElementById("root"))
})
