import React, { Component } from "react";
import userHeader from "./userHeader";
import './user.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";

class RatedMusic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uSongList: [],
            config: {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            },
            allRatedSongs: {}
        }
    }

    deleteHandler = (uSongID) => {
        const displayUserSongs = this.state.uSongList.filter((uSong) => {
            return uSong._id !== uSongID
        })
        this.setState({
            uSongList: displayUserSongs
        })

        Axios.delete(
            `http://localhost:2020/uSong/${uSongID}`, this.state.config)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        Axios.get("http://localhost:2020/uSong", this.state.config)
            .then((response) => {
                this.setState({
                    uSongList: response.data
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
                <Route component={userHeader} />
                <div>
                    <center><h1>Users List</h1>

                    <Container className='data1'>

                        <Table className="table1">
                            <thead>
                                <tr>
                                    <th>Song Title</th>
                                    <th>Duration</th>
                                    <th>Artist</th>
                                    <th>Genre</th>
                                    <th>Rating</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.uSongList.map((uSong) => {
                                        return (
                                            <tr key={uSong._id}>
                                                <td>{uSong.SongTitle}</td>
                                                <td>{uSong.Duration}</td>
                                                <td>{uSong.Artist}</td>
                                                <td>{uSong.Genre}</td>
                                                <td>{uSong.Rating}</td>
                                                <td><Button onClick={() => this.deleteHandler(uSong._id)}>Delete</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Container>
                    </center>

                </div>
            </React.Fragment>
        )
    };
}

export default RatedMusic;