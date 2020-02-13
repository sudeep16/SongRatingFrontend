import React, { Component } from "react";
import userHeader from "./adminHeader";
import './admin.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Table } from "react-bootstrap";

class userList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            usersList: [],
            config: {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            },
            allUsers: {}
        }
    }

    componentDidMount() {
        Axios.get("http://localhost:2020/users/profile", this.state.config)
            .then((response) => {
                this.setState({
                    usersList: response.data
                });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <React.Fragment>
                <Route component={userHeader} />
                <div>
                    <center><h1>Songs List</h1></center>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Song Title</th>
                                <th>Duration</th>
                                <th> Genre</th>
                                <th>Artist</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.songs.map((song) => {
                                    return (    
                                        <tr key={usersList._id}>
                                            <td>{usersList.SongTitle}</td>
                                            <td>{usersList.Duration}</td>
                                            <td>{usersList.Genre}</td>
                                            <td>{usersList.Artis}</td>
                                            <button type="submit">Edit</button>
                                            <button type="submit">Delete</button>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </React.Fragment>
        )
    };
}

export default userList;