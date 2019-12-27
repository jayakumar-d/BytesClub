
import React from "react";
import 'react-notifications/lib/notifications.css';
import queryString from 'query-string'
var querystring = require('querystring');


class ViewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: null,
      eventName: null,
      venue: null,
      count: null,
      name: null,
      content: null,
      data: []
    }
  }
  componentDidMount = () => {
    debugger


  }

  componentWillMount = () => {
    const values = queryString.parse(this.props.location.search)
    debugger
    let arr = [];
    var obj = {};

    fetch('http://localhost:3000/viewevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: values.id
      })

    }).then(response => response.json())
      .then(function (Response) {
        var response = Response.response[0];
        // response.forEach(function (value, index, array) {
        //     obj = {
        //         key: value["_id"],
        //         name: value["name"],
        //         content: value["content"],
        //         dateTime: value["eventStartDate"],
        //         venue: value["venue"],
        //         count: value["count"], 
        //         id: value["_id"],                      
        //     };
        //     arr.push(obj);
        // });
        debugger

        this.setState({
          data: response, loginState: false,
        });
        localStorage.setItem('token', Response.token)
        if (Response.status == 200) {

        } else {

        }

      }.bind(this)).catch(function (error) {
      });

  }

  render() {
    const elements = this.state.data;
    const items = []
    debugger

    return (
      <React.Fragment>  <div className="container" style={{ "max-width": "100%", "padding": "0px" }}>
        <div style={{ backgroundColor: "#19315d" }}><h1 className="name1">Hackathon events</h1></div>
        <hr style={{ margin: 0 }}></hr>
        <div className="sticky">
          <div>
            <span className="dateStyle">{this.state.data && new Date(this.state.data.eventStartDate).toDateString()}</span>
          </div>
          <h2 style={{ margin: 0, "font-style": "italic", "font-size": "20px" }}>{this.state.data && this.state.data.eventName}</h2>
        </div>
        <hr style={{ margin: 0 }}></hr>
        <div style={{ backgroundColor: "#e6e6e6", "display": "inline-flex", "height": "500px" }}>
          <div style={{ padding: "10px" }}>
            <h3 style={{ "font-style": "italic", "font-size": "20px" }}>Details</h3>
            <p>
              {this.state.data && this.state.data.content}
            </p>
          </div>
          <div className="inner" style={{ "z-index": "100" }}>
            <div className="card" style={{ width: "400px", margin: "10px", "border-radius": "20px" }}>
              <div className="card-body">
                <span style={{ display: "inline-block", "padding": "10px" }}>
                  <img className="cardImg" src={'./img/card.png'} />
                </span>
                <span style={{ display: "inline-block" }}>
                  <div>
                    <div>{this.state.data && this.state.data.eventName}</div>
                    <div>Public Group</div>
                  </div>
                </span>
              </div>
            </div>

            <div className="card" style={{ width: "400px", margin: "10px", "border-radius": "20px" }}>
              <div className="card-body">
                <div>
                  <span style={{ display: "inline-block", "padding": "10px" }}><i className="fa fa-clock-o" style={{ "font-size": "24px" }}></i></span>
                  <span style={{ display: "inline-block" }}>{this.state.data && new Date(this.state.data.eventStartDate).toDateString()}</span>
                </div>
                <div>
                  <span style={{ display: "inline-block", "padding": "10px" }}>
                    <i className="fa fa-map-marker" style={{ "font-size": "24px" }}></i>
                  </span>
                  <span style={{ display: "inline-block" }}>
                    {this.state.data.venue}
                   </span>
                </div>
                <div>
                  <span style={{ display: "inline-block", "padding": "10px" }}>
                    <i className="fa fa-male" style={{ "font-size": "24px" }}></i>
                  </span>
                  <span style={{ display: "inline-block" }}>
                     {this.state.data.count}
                  </span>
                </div>
                <div>
                  <span style={{ display: "inline-block", "padding": "10px" }}>
                    <i className="fas fa-id-badge" style={{ "font-size": "24px" }}></i>
                  </span>
                  <span style={{ display: "inline-block" }}>
                  {this.state.data.organizer}
                  </span>
                </div>
                <div>
                  <span style={{ display: "inline-block", "padding": "10px" }}>
                    <i className="fa fa-bars" style={{ "font-size": "24px" }}></i>
                  </span>
                  <span style={{ display: "inline-block" }}>
                    {this.state.data.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer" style={{ padding: "10px" }}>

          <span style={{ color: "black", display: "inline", "font-size": "20px","font-style": "italic" }}>{this.state.data && this.state.data.eventName}</span>
          <span style={{ display: "inline" }}><button type="button" className="btn btn-primary" style={{ float: "right", "margin-right": "20px" }}>Attend</button></span>


        </div>

      </div>

      </React.Fragment>
    );
  }
};


export default ViewEvent