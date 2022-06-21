import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      full_name: '',
      address: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount(){
    let signup = document.querySelector('.hidden-for-login')
    if (this.props.formType === 'Sign up'){
      signup.classList.add('signup')
      
    } else {
      signup.classList.remove('signup')
    }
  
    let hidden = document.querySelector('.hidden-during-form')
    if (this.props.formType){
      hidden.classList.add('hidden')
    } else {
      hidden.classList.remove('hidden')
    }
  }
  

  render() {
    return (
      <div className="login-form-container">
        <div className='login-form-left'>
          {this.props.imgLeft}
        </div>
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="login-form">
            <div className='form-body'>{this.props.formBody}</div>
            <br/><br/><br/>
            <label>Email
            <br/>
              <br></br>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br/>
            <br></br>
            <label>Password
            <br/>
            <br></br>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/><br/>

            <div className='hidden-for-login'>
              <label>Full Name
              <br/><br/>
                <input type='text'
                value={this.state.full_name}
                onChange={this.update('full_name')}
                className='login-input'
                />
              </label>
              <br/><br/>
              <label>Address
                <br/>
                <input type='text'
                value={this.state.address}
                onChange={this.update('address')}
                className='login-input'
                />
              </label>
            </div>
            <br/>
            <br></br>
            {this.renderErrors()}
            <input className="session-submit" type="submit" value={this.props.formType} />
            <br></br><br></br>
            <div className='helper-link'>
              {this.props.navHelper} {this.props.navLink}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
