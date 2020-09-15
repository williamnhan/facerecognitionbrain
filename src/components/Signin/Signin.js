import React from 'react';
import { BACK_END } from '../../constants.js';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singnInEmail: '',
      signInPassword: '',
      errorMessage: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({singnInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmmitFrom = () => {
    fetch(BACK_END + 'signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        signInEmail: this.state.singnInEmail,
        signInPassword: this.state.signInPassword
      })
    })
    .then(respone => respone.json())
    .then(data => {
      if (data.id) {
        this.props.loadUser(data);
        this.props.onRouteChange('home');
      } else {
        this.onSignInStatus(data);
      }
    })
  }
  
  onSignInStatus = (errorMessage) => {
    this.setState({errorMessage});
  }

  render() {
    const {onRouteChange} = this.props;
    let  errorMessage = '';
    if (this.state.errorMessage) {
      errorMessage = (
        <div className="lh-copy mt3">
          <p  className="f6 dim red db ">{this.state.errorMessage}</p>
        </div>
      )
    }
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              {errorMessage}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmmitFrom}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" value="Sign in" 
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signin;