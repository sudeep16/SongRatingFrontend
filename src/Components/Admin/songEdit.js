import React, { Component } from "react";
import userHeader from "./adminHeader";
import './admin.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

class adminHomepage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <React.Fragment>
                <Route component={userHeader} />
                <div>
                    <center><h1>Edit Song Detail</h1></center>
                    <center>
                        <div className="form-group">
                            <label>Song Title</label>
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>

                        <div className="form-group">
                            <label>Song Duration</label>
                            <input type="text" className="form-control" placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <label>Song Artist</label>
                            <input type="text" className="form-control" placeholder="Confirm Password" />
                        </div>

                        <div className="form-group">
                            <label>Song Genre</label>
                            <input type="text" className="form-control" placeholder="Enter Email" />
                        </div>
                    </center>
                </div>
            </React.Fragment >
        )
    }
}
export default adminHomepage;