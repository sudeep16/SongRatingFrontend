import React, { Component } from "react";
import userHeader from "./userHeader";
import './user.css';
import Axios from "axios";
import { Route } from "react-router-dom";

class Homepage extends Component {
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
                    {
                        this.state.songs.map((song) => {
                            return (
                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="card-title">{song.SongTitle}</h3>
                                        <h4 class="card-subtitle mb-2 text-muted">{song.Artist}</h4>
                                        <p class="card-text">{song.Genre}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </React.Fragment>
        )
    };
}

export default Homepage;