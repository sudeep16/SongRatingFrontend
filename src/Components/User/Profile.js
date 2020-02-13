import React, { Component } from "react";
import userHeader from "./userHeader";
import './user.css';
import Axios from "axios";
import { Route } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
                songs: [],
                config: {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                },
                selectedSong: {}
            }
    
    }

    componentDidMount() {
        Axios.get("http://localhost:2020/song")
            .then(res => res.json())
            .then((data) => {
                this.setState({ songs: data })
            })
            .catch(console.log)
    }

    updateHandler = (e) => { // use class property plugin in babel rc 
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

            'http://localhost:2020/users/Profile', uData
        )
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                location.href = "/UpdateProfile"
            })
            .catch((err) => {
                console.log(err);
            })

    }
    render() {
        return (
            <React.Fragment>
                <Route component={userHeader} />
                <div>
                    <center><h1>Profile Information</h1></center>
                    {/* {songs.map((song) => ( */}
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <div class="card">
                                <div class="card-body">
                                    <h2 class="card-subtitle">Username</h2>
                                    <h4 class="card-subtitle"> Email : ;) </h4>
                                    <h4 class="card-subtitle"> Address : ;) </h4>
                                    <h4 class="card-subtitle"> Gender : ;) </h4>
                                    <h4 class="card-subtitle"> Phone : ;) </h4>
                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.updateHandler}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </React.Fragment>
        )
    };
}

export default Profile;