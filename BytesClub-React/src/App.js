import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './App/admin'
import NewEvent from './App/newevent';
import ViewEvent from './App/viewevent';
import ViewCategory from './App/viewcategory';
import 'bootstrap/dist/js/bootstrap';
import HelpPage from './App/helpPage';


import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Register from './App/register';
import Login from './App/login';
import EventList from './App/eventlist';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({ loginState: false });

  }

  componentWillMount = () => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })

    }).then(response => response.json())
      .then(function (Response) {
        if (Response.status == 200) {
          debugger
          if (localStorage.getItem('token') == Response.token) {
            this.setState({
              loginState: true,
            })
          }
        } else {
          debugger

          this.setState({
            loginState: false
          });
          this.props.history.push('/');
        }
      }.bind(this));
  }

  handleLanguage = (langValue) => {
    debugger
    this.setState({ loginState: langValue });
  }

  onNewEvent = () => {
    this.props.history.push('/newEvent');
  }
  onRegisterSubmit = () => {
    this.props.history.push('/register');
  }

  onLoginSubmit = () => {
    this.props.history.push('/login');
  }


  viewcategory = (e) => {
    debugger
    this.props.history.push("/viewcategory/?category=family");
}

onHelp = () => { 
  this.props.history.push('/helpPage');
 }


  onLogoutSubmit = () => {
    localStorage.clear();
    this.setState({
      loginState: false,
    });
    this.props.history.push('/');
  }

  render() {
    var data = [
      { name: "Family", url: "viewcategory/?category=family", img:"./img/family.png"},      
      { name: "Health", url: "viewcategory/?category=health", img:"./img/health.png"},
      { name: "Language", url: "viewcategory/?category=language", img:"./img/language.png"},            
      { name: "Outdoor", url:"viewcategory/?category=outdoor", img:"./img/outdoor.png"},
      { name: "People", url:"viewcategory/?category=people", img:"./img/people.jpg"},      
      { name: "Sports", url: "viewcategory/?category=sports", img:"./img/sports.png"},
      { name: "Tech", url: "viewcategory/?category=tech", img:"./img/tech.png"},      
      { name: "Learn", url: "viewcategory/?category=learn", img:"./img/learn.png"}, 
    ];    
    const cat_items = [];
    for (var cat of data) {
      var img = cat.img;
      cat_items.push(
        <div className="col-xs-6 col-sm-6 col-lg-3 col-md-6">
          <div className="e-card" id="basic_card" style={{ color: '#ff0000', border: 'none' }}>
            <div className="e-card-header">
              <div className="e-card-header-caption">
                <div className="e-card-title">{cat.name}</div>
              </div>
            </div>
            <div className="e-card-content">
              <a  onClick={this.viewcategory} target='_blank'><img src={cat.img} alt="family" /></a>
            </div>
          </div>
        </div>
      );
    }
      return (
        <React.Fragment>
          <Switch>
            <Route exact path="/">
              <nav class="navbar navbar-expand-lg navbar-dark dark fixed-top">
                <div class="container">
                  <a class="navbar-brand" href="#">Bytes Club</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item active">
                        <a class="nav-link" onClick={this.onNewEvent}>New Event
              <span class="sr-only">(current)</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" onClick={this.onHelp} >Help Center</a>
                      </li>
                      {this.state.loginState === false && (
                        <li class="nav-item">
                          <a class="nav-link" onClick={this.onLoginSubmit}>Login</a>
                        </li>
                      )}
                      {this.state.loginState === true && (
                        <li class="nav-item">
                          <a class="nav-link" onClick={this.onLogoutSubmit}>Logout</a>
                        </li>)}
                      {this.state.loginState === false && (
                        <li class="nav-item">
                          <a class="nav-link" onClick={this.onRegisterSubmit}>Register</a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>

              <div class="container-slider">
                <div class="row align-items-center my-5">
                  <div style={{width:'100%'}}>
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                      <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                      </ol>
                      <div class="carousel-inner e-slider">
                        <div class="carousel-item active">
                          <img class="d-block w-100" src={require('./image/event1.png')} alt="First slide" />
                        </div>
                        <div class="carousel-item">
                          <img class="d-block w-100" src={require('./image/event2.png')} alt="Second slide" />
                        </div>
                        <div class="carousel-item">
                          <img class="d-block w-100" src={require('./image/event3.png')} alt="Third slide" />
                        </div>
                      </div>
                      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
              </div>

              <div class="container">
                <div class="row col-md-12">
                  <EventList {...this.props} >
                  </EventList>
                </div>
              </div>
              <div className='container category' >
                <div className='control-section card-control-section basic_card_layout' >
                  <div className="e-card-resize-container">
                    <div>
                      <h2>Catagories</h2>
                    </div>
                    <div className='row'>
                      <div className="row card-layout" >{cat_items}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </Route>
            <Route path="/login">
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
                      <li class="nav-item ">
                        <a class="nav-link" href="#" onClick={this.onHelp} >Help Center</a>
                      </li>
                      {this.state.loginState === false && (
                        <li class="nav-item active">
                          <a class="nav-link" onClick={this.onLoginSubmit}>Login</a>
                        </li>
                      )}
                      {this.state.loginState === true && (
                        <li class="nav-item">
                          <a class="nav-link" onClick={this.onLogoutSubmit}>Logout</a>
                        </li>)}
                      {this.state.loginState === false && (
                        <li class="nav-item">
                          <a class="nav-link" onClick={this.onRegisterSubmit}>Register</a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>
              <Login {...this.props} onSelectLanguage={this.handleLanguage}></Login>
            </Route>
            <Route path="/register">
              <Register {...this.props}></Register>
            </Route>
            <Route path="/newEvent">
              <NewEvent {...this.props}>
              </NewEvent>              
            </Route>
            <Route path="/viewcategory">
              <ViewCategory {...this.props}>
              </ViewCategory>
            </Route>
            <Route path="/helpPage">
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
                      <li class="nav-item  active">
                        <a class="nav-link" href="#" onClick={this.onHelp}>Help Center</a>
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
                        <li class="nav-item">
                          <a class="nav-link" onClick={this.onRegisterSubmit}>Register</a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>
              <HelpPage {...this.props}>
              </HelpPage>
            </Route>
            <Route path="/viewevent">
              <ViewEvent {...this.props}>
              </ViewEvent>
            </Route>
            <Route path="/admin">
              <nav class="navbar navbar-expand-lg navbar-dark dark fixed-top">
                <div class="container">
                  <a class="navbar-brand" href="#">Bytes Club</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                        <a class="nav-link">Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <Admin {...this.props}>
              </Admin>
            </Route>
          </Switch>

          <footer class="footer dark col-md-12">
            <div class="container">
              <div class="row">
                <div class="col-lg-6 h-100 text-center text-lg-left my-auto content">
                  <p class="text-muted small mb-4 mb-lg-0">Copyright © 2019 Bytes-Club - All Rights Reserved.
            </p>
                </div>
                <div class="col-lg-6 h-100 text-center text-lg-right my-auto">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item mr-3">
                      <a href="www.facebook.com//">
                        <i class="fab fa-facebook fa-2x fa-fw"></i>
                      </a>
                    </li>
                    <li class="list-inline-item mr-3">
                      <a href="https://mobile.twitter.com/">
                        <i class="fab fa-twitter-square fa-2x fa-fw"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="https://www.instagram.com/">
                        <i class="fab  fa-instagram fa-2x fa-fw"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </React.Fragment>
      );
    }
  }
  export default App;
