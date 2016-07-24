const React = require('react')
const Link = require('react-router').Link
const hashHistory = require('react-router').hashHistory
const SessionStore = require("../stores/session_store")
const SessionActions = require("../actions/session_actions")
const ErrorStore = require("../stores/error_store")

const LoginForm = React.createClass({
  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },
  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn)
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this))
  },
  componentWillUnmount: function() {
    this.sessionListener.remove()
    this.errorListener.remove()
  },
  redirectIfLoggedIn() {
    if (SessionStore.currentUser().id) {
      hashHistory.push("/");
    }
  },
  update(field) {
    return (event) => this.setState({[field]: event.target.value})
  },
  submit(event) {
    if (this.props.route.path === "login") {
      SessionActions.login(this.state)
    } else {
      SessionActions.signup(this.state)
    }
  },
  errors(field) {
    var errors = ErrorStore.errors()
    if (!errors[field]) { return }
    errors = errors[field].map((error, i) => {
      return <li key={ i }>{ error }</li>
    })
    return <ul className="errors" >{errors}</ul>
  },
  render: function() {
    let switchForm, formName;
    if (this.props.route.path === "login") {
      switchForm = <Link className="switch-form" to="/signup">Sign Up</Link>
      formName = "Log In"
    } else {
      switchForm = <Link className="switch-form" to="/login">Log In</Link>
      formName = "Sign Up"
    }
    return (
      <div className="screen-fade">
        <div className="form-box" >
          <h1 className="logo-header">
            Collectize
            <Link to="/" className="dismiss">X</Link>
          </h1>
          <form onSubmit={this.submit} className="login-form">
            <h2 className="form-header"> { formName }</h2>
            { this.errors("base") }

            { this.errors("username") }
            <input className="login-field"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username" />

            { this.errors("password") }
            <input className="login-field"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password" />

            <button className="login-submit" type="submit">{ formName }</button>
          </form>
          <div className="login-footer">{ switchForm }</div>
        </div>
      </div>
    )
  }

})

module.exports = LoginForm
