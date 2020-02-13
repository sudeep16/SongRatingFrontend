import React, { Component } from "react";
import adminHeader from "./adminHeader";
import './admin.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

class userList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersList: [],
            config: {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            },
            allUsers: {}
        }
    }

    deleteHandler = (uID) => {
        const displayUser = this.state.usersList.filter((users) => {
            return users._id !== uID
        }) 
        this.setState({
            usersList: displayUser
        })

        Axios.delete(
            `http://localhost:2020/admin/userList/${uID}`, this.state.config)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        Axios.get("http://localhost:2020/admin/userList", this.state.config)
            .then((response) => {
                this.setState({
                    usersList: response.data
                });
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <React.Fragment>
                <Route component={adminHeader} />
                <div>
                    <center><h1>Songs List</h1></center>

                    <Table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usersList.map((users) => {
                                    return (
                                        <tr key={users._id}>
                                            <td>{users.Username}</td>
                                            <td>{users.Email}</td>
                                            <td>{users.Phone}</td>
                                            <td>{users.Address}</td>
                                            <td>{users.Gender}</td>
                                            <td><Button onClick = {() => this.deleteHandler(users._id)}>Delete</Button></td>
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