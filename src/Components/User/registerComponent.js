import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Form } from 'react-bootstrap';

export default class Register extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            Username: '',
            Password: '',
            CPassword: '',
            Email: '',
            Phone: '',
            Address: '',
            Gender: 'Male',
            isRegistered: false,
        }

    }



    usernameHandler = (e) => {
        this.setState({ Username: e.target.value })
        if (e.target.value.length < 6) {
            this.setState({ validationMessage: 'Userame must be greater than 6' })
        }
    }

    passwordHandler = (e) => {
        this.setState({ Password: e.target.value })
    }

    cpasswordHandler = (e) => {
        this.setState({ CPassword: e.target.value })
    }

    emailHandler = (e) => {
        this.setState({ Email: e.target.value })
    }

    phoneHandler = (e) => {
        this.setState({ Phone: e.target.value })
    }

    addressHandler = (e) => {
        this.setState({ Address: e.target.value })
    }

    genderHandler = (e) => {
        this.setState({ Gender: e.target.value })
    }

    registerHandler = (e) => {
        e.preventDefault();

        var data = {
            Username: this.state.Username,
            Password: this.state.Password,
            CPassword: this.state.CPassword,
            Email: this.state.Email,
            Phone: this.state.Phone,
            Address: this.state.Address,
            Gender: this.state.Gender,
            redirect: true,

        }

        Axios.post(
            //url
            //data -> js oject this.state,
            //headers -> js object

            'http://localhost:2020/users/registration',
            data
        )
            .then((response) => {
                console.log(response);  
                    localStorage.setItem("token", response.data.token);
                    location.href = "/login"
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {

        if (this.state.redirect == true) {
            return (
                <Redirect to='/login' />
            )
        }
        return (

            <Form onSubmit = {this.registerHandler}>
                <h3>Registration</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" value = {this.state.Username} onChange = {this.usernameHandler}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" value = {this.state.Password} onChange = {this.passwordHandler}/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password" value = {this.state.CPassword} onChange = {this.cpasswordHandler}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter Email" value = {this.state.Email} onChange = {this.emailHandler}/>
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" placeholder="Enter Phone" value = {this.state.Phone} onChange = {this.phoneHandler}/>
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" placeholder="Enter Address" value = {this.state.Address} onChange = {this.addressHandler}/>
                </div>
                <div className="form-group">
                    <label>Gender</label> &nbsp;
                        <input type="radio" name="gender" value={"Male"} checked = {this.state.Gender === "Male"} onChange = {this.genderHandler} /> Male &nbsp;
                        <input type="radio" name="gender" value={"Female"} checked = {this.state.Gender === "Female"} onChange = {this.genderHandler}/> Female
                </div>
    
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    <h6>Already registered <a href="/login">Sign In ?</a></h6>
                </p>
            </Form>
        );
    }
}