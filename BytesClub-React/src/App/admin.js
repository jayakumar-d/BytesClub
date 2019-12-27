import React from 'react';
import serialize from 'form-serialize';
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';


import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Admin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dateTime: null,
            eventName: null,
            venue: null,
            count: null,
            name: null,
            content: null,
            data: [],
            loginState: false
        }
    }
    dropDownData = ['Outdoor & Adventure', 'Tech', 'Family', 'Health & Wellness', 'Sports & Fitness', 'Learning', 'Photography', 'Food & Drink', 'Writing', 'Language & Culture', "Music", 'Movements'];


    onChange = (e) => {
        debugger
        let arr = [];
        var obj = {};

        fetch('http://localhost:3000/filterevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: e.itemData.value
            })

        }).then(response => response.json())
            .then(function (Response) {
                var response = Response.response;
                response.forEach(function (value, index, array) {
                    obj = {
                        key: value["_id"],
                        eventName: value["eventName"],
                        content: value["content"],
                        dateTime: new Date(value["eventStartDate"]).toDateString(),
                        venue: value["venue"],
                        organizer: value["organizer"],
                        count: value["count"],
                        id: value["_id"],
                    };
                    arr.push(obj);
                });

                this.setState({
                    data: arr, loginState: false,
                });
                if (Response.status == 200) {
                    this.setState({
                        loginState: true
                    });

                } else {

                    this.setState({
                        loginState: false
                    });
                    this.props.history.push('/');
                }

            }.bind(this)).catch(function (error) {
            });
    }


    componentWillMount() {
        let arr = [];
        var obj = {};

        fetch('http://localhost:3000/eventlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })

        }).then(response => response.json())
            .then(function (Response) {
                var response = Response.response;
                response.forEach(function (value, index, array) {
                    obj = {
                        key: value["_id"],
                        eventName: value["eventName"],
                        content: value["content"],
                        dateTime: new Date(value["eventStartDate"]).toDateString(),
                        venue: value["venue"],
                        organizer: value["organizer"],
                        count: value["count"],
                        id: value["_id"],
                    };
                    arr.push(obj);
                });

                this.setState({
                    data: arr, loginState: false,
                });
                if (Response.status == 200) {
                    this.setState({
                        loginState: true
                    });

                } else {

                    this.setState({
                        loginState: false
                    });
                    this.props.history.push('/');
                }

            }.bind(this)).catch(function (error) {
            });
    }



    // logout = () => {
    //   localStorage.removeItem("token");
    //   this.props.history.push("/logout");
    // }



    render() {
        const elements = this.state.data;
        const items = []
        for (const [index, value] of elements.entries()) {
            //if(index<8){
            items.push(
                <div className="card-layout col-md-12" style={{ paddingBottom: "10px" }} >
                    <div className="e-card e-cardlist" id="basic_card" style={{ boxShadow: "3px 0px 5px 1px gainsboro", paddingLeft: "10px" }} >
                        <div className="e-card-header">
                            <div className="e-card-header-caption">
                                <div className="e-card-sub-title" className="eventDate"> {this.state.data[index] && this.state.data[index].dateTime} </div>
                                <br></br>
                                <div className="e-card-sub-title" className="eventDescription">{this.state.data[index] && this.state.data[index].eventName} </div>
                                <br></br>
                                <div className="e-card-sub-title" className="venue">{this.state.data[index] && this.state.data[index].venue} </div>
                            </div>
                        </div>
                        <div className="e-card-actions">
                            <table style={{ width: '100%', tableLayout: 'fixed' }}>
                                <tr>
                                    <td>
                                        <div style={{ fontWeight: 500 }}><b>Organized By:</b>{this.state.data[index] && this.state.data[index].organizer}</div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
            )
            //  }
        }
        return (
            <div className="col-md-12">
                <div className="col-md-12 text-center">
                    <h1>Find your next event </h1>
                    <h4 style={{ paddingTop: "10px" }}>
                        {this.state.data.length && this.state.data.length} events near you
</h4>


                </div>
                <div className="col-md-12 row " style={{ marginLeft: "2px", marginTop: "10px" }}>
                    <div className="form-group col-md-4">
                        <input type="text" id="user" name="name" className="e-input" required data-msg-containerid="userError" placeholder="Event Title. Be clear and precise " />
                        <div id="userError"></div>
                    </div>
                    <div className="form-group col-md-4">
                        <DropDownListComponent id="ddlelement" name="category" select={this.onChange} dataSource={this.dropDownData} placeholder="Select a Category" />
                    </div>
                </div>

                <div className="col-md-12">
                    <React.Fragment>  {items} </React.Fragment>
                </div>

            </div>
        )
    }
}
export default Admin