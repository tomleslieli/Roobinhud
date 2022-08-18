import React from "react";
import { clearErrors } from "../../actions/session_actions";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      full_name: "",
      address: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleDemo(e) {
    e.preventDefault();
    const credentials = {
      email: "demouser123@demouser.com",
      password: "demouser123",
    };
    this.setState({
      email: "demouser123@demouser.com",
      password: "demouser123",
    });
    setTimeout(() => {
      const user = Object.assign({}, this.state);
      this.props.processForm(user);
    }, 500);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <div className="error-item">
            <li key={`error-${i}`}>{error}</li>
          </div>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    clearErrors();
    let signup = document.querySelector(".hidden-for-login");
    if (this.props.formType === "Sign up") {
      signup.classList.add("signup");
    } else {
      signup.classList.remove("signup");
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <div className="login-form-left">
          <div className="login-form-image-container">{this.props.imgLeft}</div>
        </div>
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="login-form">
            <div className="form-body">{this.props.formBody}</div>
            <br />
            <br />
            <br />
            <label>
              Email
              <br />
              <br></br>
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                className="login-input"
              />
            </label>
            <br />
            <br></br>
            <label>
              Password
              <br />
              <br></br>
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                className="login-input"
              />
            </label>
            <br />
            <br />

            <div className="hidden-for-login">
              <label>
                Full Name
                <br />
                <br />
                <input
                  type="text"
                  value={this.state.full_name}
                  onChange={this.update("full_name")}
                  className="login-input"
                />
              </label>
              <br />
              <br />
              <label>
                Address
                <br />
                <input
                  type="text"
                  value={this.state.address}
                  onChange={this.update("address")}
                  className="login-input"
                />
              </label>
            </div>
            <br />
            <br></br>
            <div className="session-errors">{this.renderErrors()}</div>
            <input
              className="session-submit"
              type="submit"
              value={this.props.formType}
            />
            {this.props.formType === "Log in" ? (
              <button className="demo-login" onClick={this.handleDemo}>
                {" "}
                Demo{" "}
              </button>
            ) : (
              <></>
            )}
            <br></br>
            <br></br>
            <div className="helper-link">
              {this.props.navHelper} {this.props.navLink}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
