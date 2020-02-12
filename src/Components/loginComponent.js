import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'react-bootstrap';

export default class Login extends React.Component {
    constructor(props){

        super(props);
        this.state = { 
            Username:'',
            Password:''
    
        }
    }
    
    changeHandlerUsername = (e) => {
        this.setState({Username:e.target.value})
    }
    
    changeHandlerPassword = (e) => {
        this.setState({Password:e.target.value})
    }
    
    submitHandler = (e) => { // use class property plugin in babel rc 
    e.preventDefault();
    fetch('http://localhost:2020/login',{ //FormData
        method:'POST',
        headers:{
            // Content-Type: // www-x-form urlencoded actual form submit without react
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state ) // JSON.parse(this.state)
    
    
    })
    .then( (response) => response.json())
    .then((data) => {
        console.log(data.userToken)
        localStorage.setItem("Assignment_Usr_Token",data.userToken);
    })
    .catch((error) => {
    
        console.log(error)
    
    })
    
    }
    
    
    render() {
        return (
            <Form onSubmit = {this.submitHandler}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="email" className="form-control" placeholder="Enter Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </Form>
        );
    }
}