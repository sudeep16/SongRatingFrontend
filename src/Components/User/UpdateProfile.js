import React, { Component } from "react";
import userHeader from "./userHeader";
import './user.css';
import { Route } from "react-router-dom";
import { Form } from 'react-bootstrap';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <Route component={userHeader} />
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Form>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" placeholder="Confirm Password" />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter Email" />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" className="form-control" placeholder="Enter Phone" />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" placeholder="Enter Address"  />
                            </div>
                            <div className="form-group">
                                <label>Gender</label> &nbsp;
                                    <input type="radio" name="gender"  /> Male &nbsp;
                                    <input type="radio" name="gender" /> Female
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        </Form>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateProfile;