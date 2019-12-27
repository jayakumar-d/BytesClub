import React from "react";
import serialize from 'form-serialize';
import { Form } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import 'react-notifications/lib/notifications.css';
import "react-datepicker/dist/react-datepicker.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const stayOptions = [
  { key: 'ac', text: 'AC', value: 'AC' },
  { key: 'non-ac', text: 'NON-AC', value: 'NON-AC' },
]
const profOptions = [
  { key: 'study', text: 'Studying', value: 'Studying' },
  { key: 'non-study', text: 'Working', value: 'Working' },
]

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharingType: null,
      userLength: null,
      imageBase64: null
    }
  }


  onAddUserSubmit = function (event) {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
      ;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (form.checkValidity() === true) {
        event.preventDefault();
        var form = document.querySelector('#data');
        document.querySelector('#addloading').classList.add("loading");
        var addData = serialize(form, { hash: true });
        addData["imagebase64"] = this.state.imageBase64;
        addData["key"] = "user";
        addData["status"] = "active";
        addData["uniqueID"] = "DNH" + this.state.userLength+1;
        fetch('http://localhost:3000/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            addData
          })
        }).then(response => response.json())
          .then(function (data) {

            if (data.status == 204) {

            } else {

              document.querySelector('#addloading').classList.remove("loading");
              form.classList.remove('was-validated');
              NotificationManager.success(' User added successfully', 'Success');
              form.reset();
            }

          }.bind(this)
          ).catch(function (error) {


          }.bind(this));
      }
      form.classList.add('was-validated');
    }.bind(this));

  }.bind(this);

  componentDidMount() {
    let arr = [];
    if (this.props.state) {
      fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      }).then(response => response.json())
        .then(function (data) {

          if (data.status == 204) {
            this.setState({
              viewRowData: null, loginState: true
            })
            this.props.props.history.push("/logout");
          } else {
            if (data.length > 0) {
              this.setState({
                userLength: data.length
              })
              document.querySelector('#addloading').classList.remove("loading");
            }
            var arr = [];
            var obj = {};
            data.forEach(function (value, index, array) {
              obj = {
                key: value["_id"],
                text: value["name"],
                value: value["_id"]
              };
              arr.push(obj);
            });
            ;
            this.setState({
              viewRowData: data, loginState: false,
              friendOptions: arr
            });
          }
        }.bind(this)
        ).catch(function (error) {
          this.setState({
            viewRowData: null,
            loginState: false,
          })
        }.bind(this));
    }
  }
  onSharingChange = (e, data) => {
    this.setState({ sharingType: data.value });
  }

  Base64ToImage = (base64img, callback) => {
    var img = document.getElementById('image');
    img.src = base64img;
  }
  fileChange = () => {
    var files = document.getElementById('file').files;
    if (files.length > 0) {
      this.getBase64(files[0]);
    }
  }
  getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      this.Base64ToImage(reader.result);
      this.setState({ imageBase64: reader.result });

      console.log(reader.result);
    }.bind(this);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  onProfessiontypeChange = (e, data) => {
    console.log(data.value);
    this.setState({ professionType: data.value });
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <div>
        <div id="results" className="search-results p-5">
          <NotificationContainer />
          <div>
            <Form id='addloading' className="loading">
              <form id="data" onSubmit={this.onAddUserSubmit} className="form-group needs-validation">
                <div className="row">
                  <div className="form-group col-md-6" style={{ marginTop: "180px" }}>
                    <label for="exampleInputEmail1"> Name</label>
                    <input type="" required className="form-control" placeholder="Enter name" name="name"></input>
                    <div className="invalid-feedback">
                      Please enter a username.
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <div className="preview text-center">
                      <img className="preview-img" id="image" src="/img/profile.png" alt="Preview Image" width="200" height="200" />
                      <div className="browse-button">
                        <i className="fa fa-pencil-alt"></i>
                        <input className="browse-input" id="file" type="file" name="imagebase64" onChange={this.fileChange} required="" />
                      </div>
                      <div className="p-2">Upload Image</div>
                      <span className="Error"></span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1"> Email</label>
                  <input type="" required className="form-control" placeholder="Enter email" name="email"></input>
                  <div className="invalid-feedback">
                    Please enter a email.
                   </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Hostel No</label>
                    <input type="" required className="form-control" placeholder="Enter hostel number" name="hostelno"></input>
                    <div className="invalid-feedback">
                      Please enter a hostel number.
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Room No</label>
                    <input type="" required className="form-control" placeholder="Enter room number" name="roomno"></input>
                    <div className="invalid-feedback">
                      Please enter a room number.
                   </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Sharing (AC/ Non-A/C)</label>
                    <Form.Select fluid onChange={this.onSharingChange} options={stayOptions} placeholder="Sharing (AC/ Non-A/C)" />
                    <input type="" required value={this.state.sharingType} className="form-control  d-none" placeholder="Email" name="sharingtype"></input>
                    <div className="invalid-feedback">
                      Please enter a sharing mode.
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Studying / Working</label>
                    <Form.Select fluid onChange={this.onProfessiontypeChange} options={profOptions} placeholder="Studying / Working" />

                    <input required className="form-control  d-none" placeholder="Email" name="professiontype" value={this.state.professionType}></input>
                    <div className="invalid-feedback">
                      Please enter a profession type.
                   </div>
                  </div>

                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1"> Studying/ Working Address</label>
                  <textarea required className="form-control" placeholder="Enter studying/ working  address" rows="3" name="swaddress"></textarea>
                  <div className="invalid-feedback">
                    Please enter the studying/ working  address
                   </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label for="exampleInputEmail1">Advance Amount</label>
                    <input type required className="form-control" placeholder="Enter the advance amount" name="advanceamount"></input>
                    <div className="invalid-feedback">
                      Please enter the advance amount
                   </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="exampleInputEmail1">Rent Amount</label>
                    <input type required className="form-control" placeholder="Enter the rent amount" name="rentamount"></input>
                    <div className="invalid-feedback">
                      Please enter the rent amount
                   </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="exampleInputEmail1">Room Sharing</label>
                    <input type required className="form-control" placeholder="Enter the sharing " name="noofsharing"></input>
                    <div className="invalid-feedback">
                      Please enter the room sharing
                   </div>
                  </div>

                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Age </label>
                    <input type required className="form-control" placeholder="Enter the age " name="age"></input>
                    <div className="invalid-feedback">
                      Please enter the age
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Date of Joining</label>
                    <DatePicker selected={this.state.startDate} dateFormat="dd/MMM/yyyy"
                      onChange={this.handleChange} required={true} className="col-md-12" name="doj" placeholderText="Enter the Joining Date"></DatePicker>
                    <div className="invalid-feedback">
                      Please enter the date of Joining
                   </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Mobile Number</label>
                    <input type="" required className="form-control" placeholder="Enter mobile no" name="smobileno"></input>
                    <div className="invalid-feedback">
                      Please enter the mobile number
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Parent's Mobile Number</label>
                    <input type="" required className="form-control" placeholder="Enter parent's mobile no" name="pmobileno"></input>
                    <div className="invalid-feedback">
                      Please enter the Parents amount
                   </div>
                  </div>
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1"> Permanent Address</label>
                  <textarea required className="form-control" placeholder="Enter permanent address" rows="3" name="paddress"></textarea>
                  <div className="invalid-feedback">
                    Please enter the permanent address
                   </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-4">
                    <label for="exampleInputEmail1">City </label>
                    <input type required className="form-control" placeholder="Enter the city " name="city"></input>
                    <div className="invalid-feedback">
                      Please enter the city
                   </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="exampleInputEmail1">State</label>
                    <input type required className="form-control" placeholder="Enter the state " name="state"></input>
                    <div className="invalid-feedback">
                      Please enter the state
                   </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="exampleInputEmail1">Pin Code</label>
                    <input type required className="form-control" placeholder="Enter the pincode " name="pincode"></input>
                    <div className="invalid-feedback">
                      Please enter the pincode
                   </div>
                  </div>
                </div>
                <div className="text-center">
                  <input type="submit" value="Add" className="btn btn-outline-primary w-25" />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};


export default AddUser