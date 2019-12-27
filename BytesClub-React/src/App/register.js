import React from "react";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager, Notifications } from 'react-notifications';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {
      loginState: null,
      token: "",
      userLength: 0 
    }
  }
  onLoginSubmit = () => {
    this.props.history.push('/login');
}

onHelp = () => { 
  this.props.history.push('/helpPage');
 }

  onLoginSubmitClick = (event) => {
    debugger
    document.querySelector('#login-waitpopup').classList.add("loading");
    document.getElementsByTagName('body')[0].classList.add('o-disable-events');
    event.preventDefault();
    fetch('http://localhost:3000/userlength', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }           
  }).then(response => response.json()).then(function (Response) { 
      debugger         
      this.setState({ userLength: Response.response.length })
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: {
          username: this.username.current.value,
          password: this.password.current.value,
          userId: this.state.userLength +1 
        }
      })

    }).then(response => response.json())
      .then(function (Response) {
        localStorage.setItem('token', Response.token)
        if (Response.status == 200) {
          document.querySelector('#login-waitpopup').classList.remove("loading");
          document.getElementsByTagName('body')[0].classList.remove('o-disable-events');
          NotificationManager.error('Logged In Successfully');
          this.setState({
            loginState: true,
          })
          this.props.history.push('/');
        } else {
          document.querySelector('#login-waitpopup').classList.remove("loading");
          NotificationManager.error('Invalid username and password', 'Error');
          this.setState({
            loginState: false
          })
        }
      }.bind(this)).catch(function (error) {

      }); 
    }.bind(this));
  }

  render() {
    return (
      <React.Fragment>

<nav class="navbar navbar-expand-lg navbar-dark dark fixed-top">
                <div class="container">
                  <a class="navbar-brand" href="#">Bytes Club</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item ">
                        <a class="nav-link" href="#" onClick={this.onNewEvent}>New Event
              <span class="sr-only">(current)</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" onClick={this.onHelp} >Help Center</a>
                      </li>
                      {this.state.loginState === false && (
                        <li class="nav-item ">
                          <a class="nav-link" onClick={this.onLoginSubmit}>Login</a>
                        </li>
                      )}
                      {this.state.loginState === true && (
                        <li class="nav-item">
                          <a class="nav-link" onClick={this.onLogoutSubmit}>Logout</a>
                        </li>)}
                      {this.state.loginState === false && (
                        <li class="nav-item active">
                          <a class="nav-link" onClick={this.onRegisterSubmit}>Register</a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>
    <div className=" container col-md-4  o-login">      
        <form className="ui large form needs-validation" noValidate id="login-waitpopup" onSubmit={this.onLoginSubmitClick}  >
          <div className="ui stacked">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="" required name="user" ref={this.username} placeholder="Enter the username" />
                <div className="invalid-feedback">
                  Please enter a username.
                   </div>
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" ref={this.password} placeholder="Password" />
              </div>
            </div>
            {this.state.loginState === false && (
              <div className="alert alert-danger">
                <strong></strong> Enter a valid login details
</div>
            )}
            <input type="submit" className="ui fluid btn btn-primary btn-block ui download primary button" value="Register" />
          </div>
        </form>

      </div>
      </React.Fragment>

  
    );
  }
};


export default Register