const React = require('react');
const Link = require('react-router').Link;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const LoginForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
  getInitialState() {
    return {
      username: "",
      password: ""
    };
  },
  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },
  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },
  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },
	handleSubmit(event) {
		event.preventDefault();
		const formData = {
			username: this.state.username,
			password: this.state.password
		};
    if (this.props.location.pathname === "/login") {
      SessionActions.logIn(formData);
    } else {
      SessionActions.signUp(formData);
    }
	},
  fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.formType());
    if (!errors[field]) { return; }
    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });
    return <ul>{ messages }</ul>;
  },
  formType() {
    return this.props.location.pathname.slice(1);
  },
  update(property) {
    return (event) => this.setState({[property]: event.target.value});
  },
	render() {
    let navLink;
		let formName;
    if (this.formType() === "login") {
      navLink = <Link className="login-input nav-link" to="/signup">Sign Up</Link>
			formName = "Log In"
    } else {
      navLink = <Link className="login-input nav-link" to="/login">Log In</Link>
			formName = "Sign Up"
    }
		return (
			<div className="login-screen">
				<form onSubmit={this.handleSubmit} className="login-form-box">
					<div className="header-row login-header"> Collectize </div>
					<div className="login-form">
						<div className="header-row"> { formName } </div>
						{ this.fieldErrors("base") }
						{ this.fieldErrors("username") }
						{ this.fieldErrors("password") }
						<input className="login-input login-field"
									 type="text"
									 value={this.state.username}
									 onChange={this.update("username")}
									 placeholder="Username" />
								 <input className="login-input login-field"
									 type="password"
	            		 value={this.state.password}
									 onChange={this.update("password")}
									 placeholder="Password" />
						<input className="login-input login-button" type="submit" value={formName} />
					</div>
					<div className="login-footer">{ navLink }</div>
				</form>
			</div>
		);
	}
});

module.exports = LoginForm;
