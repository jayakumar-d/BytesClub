
import React from "react";
import serialize from'form-serialize'; 
import 'react-notifications/lib/notifications.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { DatePickerComponent, TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { NotificationContainer, NotificationManager, Notifications } from 'react-notifications';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class NewEvent extends React.Component {
    constructor(props) {
        super(props);
    }
    dropDownData = ['Outdoor & Adventure', 'Tech', 'Family', 'Health & Wellness', 'Sports & Fitness', 'Learning', 'Photography', 'Food & Drink', 'Writing', 'Language & Culture', "Music", 'Movements'];
    empData = ['AshokKumar', 'Farook', 'Gopinath', 'JaiKumar', 'Kanagambigai', 'Logeshwari', 'Mahesh', 'Nandhu', 'Pooja', 'Praveen', 'Sowmiya', 'Thiru'];
    locData = ['Eymard', 'Karuna 3rd Floor', 'Karuna 4th Floor', 'Mathura'];
    
    componentDidMount() {
        const options = [{
            // add the rules for validation
            rules: {
                'name': {
                    required: [true, '* Enter your name']
                },
            }
        }]
        this.formObject = new FormValidator('#formId', options);
    }
    componentWillMount = () => {
        

    }
    onSubmit = (e) => {
        e.preventDefault();
        let arr = [];
        var obj = {};
        var form = document.querySelector('#formId');
        var addData = serialize(form, { hash: true });   
        addData["key"] = "event";    

        fetch('http://localhost:3000/newevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                addData
            })

        }).then(response => response.json())
            .then(function (Response) {
                var response = Response.response;
                NotificationManager.success('Event added');
                this.props.history.push('/admin');
            }.bind(this)).catch(function (error) {
            });
    }
    onDiscard = (e) => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="content" style={{ width: "80%" }}>
                <div className="form-title"><h2><b>Add Event Details</b></h2></div>
                <form id="formId" className="form-horizontal" novalidate=""onSubmit={this.onSubmit} >
                    <div className="e-icons e-MT_Description" style={{ marginBottom: "8px" }}> <h4 style={{
                        marginTop: "-20px",
                        marginLeft: "26px"
                    }}>Basic Info</h4></div>
                    <div className="form-group">
                        <div className="e-float-input">
                            <input type="text" id="user" name="eventName" className="e-input" required data-msg-containerid="userError" placeholder="Event Title. Be clear and precise " />
                        </div>
                        <div id="userError"></div>
                    </div>
                    <div className="form-group">
                        <DropDownListComponent id="ddlelement" name="category" dataSource={this.dropDownData} placeholder="Select a Category" />
                    </div>
                    <div className="form-group">

                        <input className="e-input" type="text" placeholder="Enter tag. Add Keywords to your events" id="user" name="keywords" required data-msg-containerid="userError" />
                        <div id="userError"></div>
                    </div>
                    <div className="form-group">
                        <DropDownListComponent id="ddlelement" name="organizer" dataSource={this.empData} placeholder="Organizer" />
                    </div>
                    <hr />
                    <div className="e-icons e-MT_Location" style={{ marginBottom: "8px" }}> <h4 style={{
                        marginTop: "-20px",
                        marginLeft: "26px"
                    }}>Location</h4></div>
                    <div className="form-group">
                        <DropDownListComponent id="ddlelement" name="venue" dataSource={this.locData} placeholder="Select a Venue" />
                    </div>
                    <hr />
                    <div className="e-icons e-BT_Calendar" style={{ marginBottom: "8px" }}> <h4 style={{
                        marginTop: "-20px",
                        marginLeft: "26px"
                    }}>Date and Time</h4></div>

                    <div className="form-group">
                        <table>
                            <tr>
                                <td>
                                    <DatePickerComponent id="datepicker" name="eventStartDate" placeholder="Event Starts" showClearButton={false} />
                                </td>
                                <tr>
                                    <TimePickerComponent id="timepicker" name="eventStartTime" placeholder="Start time" showClearButton={false} />
                                </tr>
                            </tr>
                            <tr >
                                <td>
                                    <DatePickerComponent id="datepicker" name="eventEndDate" placeholder="Event Ends" showClearButton={false} />
                                </td>
                                <tr>
                                    <TimePickerComponent id="timepicker" name="eventEndTime" placeholder="End time" showClearButton={false} />
                                </tr>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <div >
                            <div style={{ marginLeft: "360px" }} >
                                <button id="validateSubmit" className="samplebtn e-control e-btn e-primary" type="submit" style={{ height: "40px", width: "150px" }} data-ripple="true" onClick={this.onSubmit}>Save Details</button>
                            </div>
                            <div style={{ float: "right" }}>
                                <button id="resetbtn" type="submit" className="samplebtn e-control e-btn" type="reset" style={{ height: "40px", width: "150px", marginTop: "-65px" }} onClick={this.onDiscard} data-ripple="true">Discard</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
};


export default NewEvent