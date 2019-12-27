
import React from "react";
import 'react-notifications/lib/notifications.css';


class EventList extends React.Component {
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

    viewEvent=(e)=>{      
        debugger  
            this.props.history.push("/viewevent?id="+e.target.id);
        }

    componentWillMount = () => {        
        let arr = [];
        var obj = {};

        fetch('http://localhost:3000/eventlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // token:localStorage.getItem('token')
            })

        }).then(response => response.json())
            .then(function (Response) {
                debugger
                var response = Response.response;                
                response.forEach(function (value, index, array) {
                    obj = {
                        key: value["_id"],
                        eventName: value["eventName"],
                        content: value["content"],
                        dateTime:
                        new Date(value["eventStartDate"]).toDateString(),
                        venue: value["venue"],
                        count: value["count"], 
                        id: value["_id"],                      
                    };
                    arr.push(obj);
                });

                this.setState({
                    data: arr, loginState: false,
                });
                // localStorage.setItem('token', Response.token)
                if (Response.status == 200) {

                } else {

                }

            }.bind(this)).catch(function (error) {
                // this.setState({
                //     loginState: false
                // });
                // this.props.history.push('/');
            }.bind(this));

    }

    render() {
        const elements = this.state.data;
        const items = []
        for (const [index, value] of elements.entries()) {
            const id="basic_card_" + index;
            if(index<8){
            items.push(
                <div className="col-xs-6 col-sm-6 col-lg-3 col-md-6">
                    <div className="e-card" id={id} >
                        <div className="e-card-header">
                            <div className="e-card-header-caption">
                                <div className="e-card-sub-title" style={{ color: '#0098ab', lineHeight:'20.2px',fontSize:'14px', letterSpacing:'-.028px',
                                 wordSpacing: '.1em', marginBottom:'8px', fontWeight: 500}}>{this.state.data[index].dateTime} </div>      
                                <div className="e-card-header-title" style={{ fontWeight: 600, fontSize: '20px',lineHeight:'1.2', marginBottom:'8px'}}>{this.state.data[index] && this.state.data[index].eventName}</div>
                                <div><span className="e-icons e-MT_Location"></span>
                                <div className="e-card-sub-title" style={{ fontWeight: 400, fontSize: '16px', color: 'rgb(117, 117, 117)', paddingLeft:'5px'}}>{this.state.data[index] && this.state.data[index].venue} </div>
                                </div>
                            </div>
                        </div>
                        <div className="e-card-actions">
                            <table style={{ width: '100%', tableLayout: 'fixed' }}>
                                <tr>
                                    <td>
                                        <div style={{ fontWeight: 400, fontSize: '14px',color: 'rgb(117, 117, 117)' }}>{this.state.data[index] && this.state.data[index].count} Attendees </div>
                                    </td>
                                    <td>
                                        <button className="e-btn e-outline e-primary" style={{ paddingLeft: '20px', paddingRight: '20px' }} onClick={this.viewEvent} id={this.state.data[index] && this.state.data[index].id}>
                                            Attend
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            )
            }
        }
        return (
            <div>
                <div className='control-pane'>
                    <div className='control-section card-control-section basic_card_layout'>
                        <div className="e-card-resize-container">
                            <h2> Upcoming Events</h2>
                            <div className='row'>
                                <div className="row card-layout" >{items}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


export default EventList