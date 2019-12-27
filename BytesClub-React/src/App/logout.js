import React from "react";

class Logout extends React.Component {
    constructor(props) {

        super(props);
    }
    loginPage = () => {
        this.props.history.push("/login")
    }

    render() {
        return (
            <div id="results" className="App">

                <div className="p-header App col-md-12 px-5">
                    <span className="" ></span>

                </div>
                <div className="col-md-12 p-5">
                    <div className="alert alert-info p-5">
                        You have been logged out. click the login button to login again
</div>
                    <button className="ui primary button  btn-sm m-1" onClick={this.loginPage}>Login Again</button>
                </div>
            </div>
        );
    }
};


export default Logout