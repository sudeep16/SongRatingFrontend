import React, { Component } from "react";
import userHeader from "./userHeader";
import './user.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: {},
            Username: "",
            Email: "",
            Address: "",
            Gender: "",
            Phone: "",
            config: {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            },
            showUpdateDetail: false,
        }

    }

    componentDidMount() {
        Axios.get("http://localhost:2020/users/profile", this.state.config)
            .then((response) => {
                this.setState({
                    userDetail: response.data
                });
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    handleClose = () => {
        this.setState({
            showUpdateDetail: false
        })
    }

    handleOpen = (profileUpdate) => {
        this.setState({
            showUpdateDetail: true
        })
    }

    updateHandler = () => { // use class property plugin in babel rc 
        console.log(this.state.userDetail);

        Axios.put(
            `http://localhost:2020/users/updProfile`,
            this.state.userDetail,
            this.state.config
        )
            .then((response) => {
                console.log(response);
                location.href = "/Profile"
            })
            .catch((err) => {
                console.log(err);
            })

    }

    emailUpdHandler = (e) => {
        this.setState({ userDetail: { ...this.state.userDetail, ["Email"]: e.target.value } });
    }

    addressUpdHandler = (e) => {
        this.setState({ userDetail: { ...this.state.userDetail, ["Address"]: e.target.value } });
    }

    genderUpdHandler = (e) => {
        this.setState({ userDetail: { ...this.state.userDetail, ["Gender"]: e.target.value } });
    }

    phoneUpdHandler = (e) => {
        this.setState({ userDetail: { ...this.state.userDetail, ["Phone"]: e.target.value } });
    }



    render() {
        return (
            <React.Fragment>
                <Route component={userHeader} />
                <div>
                    <center><h1>Profile Information</h1></center>
                    <center><Container className="data2">

                        {/* {songs.map((song) => ( */}
                        <div className="card" key={this.state.userDetail._id}>
                            <div className="card-body">
                                <h2 className="card-subtitle">{this.state.userDetail.Username}</h2>
                                <h4 className="card-subtitle"> Email : {this.state.userDetail.Email} </h4>
                                <h4 className="card-subtitle"> Address : {this.state.userDetail.Address} </h4>
                                <h4 className="card-subtitle"> Gender : {this.state.userDetail.Gender} </h4>
                                <h4 className="card-subtitle"> Phone : {this.state.userDetail.Phone} </h4>
                                <Button onClick={() => this.handleOpen(this.state.userDetail)}>Edit</Button>
                            </div>
                        </div>

                    </Container>
                    </center>
                </div>

                <Modal show={this.state.showUpdateDetail} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update User Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEditEmail">
                                <Form.Control type="email" value={this.state.userDetail.Email} onChange={this.emailUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEditAddress">
                                <Form.Control type="text" value={this.state.userDetail.Address} onChange={this.addressUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEditGender">
                                <Form.Control type="text" value={this.state.userDetail.Gender} onChange={this.genderUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEditPhone">
                                <Form.Control type="text" value={this.state.userDetail.Phone} onChange={this.phoneUpdHandler} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => this.updateHandler(this.state.userDetail._id)}>Update</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    };
}

export default Profile;