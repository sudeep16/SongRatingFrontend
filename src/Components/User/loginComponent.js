import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Form } from 'react-bootstrap';

export default class Login extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            Username: '',
            Password: ''

        }
    }

    changeHandlerUsername = (e) => {
        this.setState({ Username: e.target.value })
    }

    changeHandlerPassword = (e) => {
        this.setState({ Password: e.target.value })
    }

    loginHandler = (e) => { // use class property plugin in babel rc 
        e.preventDefault();
        var uData = {
            Username: this.state.Username,
            Password: this.state.Password,
            isOnline: true
        }

        Axios.post(
            //url
            //data -> js oject this.state,
            //headers -> js object

            'http://localhost:2020/users/login', uData
        )
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                location.href = "/Homepage"
            })
            .catch((err) => {
                console.log(err);
            })

    }


    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Form onSubmit={this.loginHandler}>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.changeHandlerUsername} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={this.changeHandlerPassword} />
                        </div>

                        {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <br />
                        <p className="Registration">
                            <h5>Not a User:  <a href="/register"><b>Register Here ?</b></a></h5>
                        </p>

                    </Form>
                </div>
            </div>
        );
    }
}