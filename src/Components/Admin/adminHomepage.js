import React, { Component } from "react";
import userHeader from "./adminHeader";
import './admin.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Table } from "react-bootstrap";

class adminHompage extends Component {
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
        Axios.get("http://localhost:2020/song", this.state.config)
            .then((response) => {
                this.setState({
                    songs: response.data
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
                                        <tr key={user._id}>
                                            <td>{song.SongTitle}</td>
                                            <td>{song.Duration}</td>
                                            <td>{song.Genre}</td>
                                            <td>{song.Artis}</td>
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

export default adminHompage;