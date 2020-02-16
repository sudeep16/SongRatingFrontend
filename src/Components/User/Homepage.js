import React, { Component } from "react";
import userHeader from "./userHeader";
import './user.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Container, Button, Modal, Form } from "react-bootstrap";
// import { Rating, AirbnbRating } from "react-native-ratings";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            config: {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            },
            show: false,
            selectedSong: {}
        }
    }

    songTitleUpdHandler = (e) => {
        this.setState({ selectedSong: { ...this.state.selectedSong, ["SongTitle"]: e.target.value } });
    }

    songDurationUpdHandler = (e) => {
        this.setState({ selectedSong: { ...this.state.selectedSong, ["Duration"]: e.target.value } });
    }

    songArtistUpdHandler = (e) => {
        this.setState({ selectedSong: { ...this.state.selectedSong, ["Artist"]: e.target.value } });
    }

    songGenreUpdHandler = (e) => {
        this.setState({ selectedSong: { ...this.state.selectedSong, ["Genre"]: e.target.value } });
    }

    songRatingUpdHandler = (e) => {
        this.setState({ selectedSong: { ...this.state.selectedSong, ["Rating"]: e.target.value } });
    }

    sTitleHandler = (e) => {
        this.setState({ SongTitle: e.target.value })
    }

    sDurationHandler = (e) => {
        this.setState({ Duration: e.target.value })
    }

    sArtistHandler = (e) => {
        this.setState({ Artist: e.target.value })
    }

    sGenreHandler = (e) => {
        this.setState({ Genre: e.target.value })
    }

    sRatingHandler = (e) => {
        this.setState({ Rating: e.target.value })
    }


    rateHandler = (e) => {
        e.preventDefault();
        var rateSongs = {
            SongTitle: this.state.selectedSong.SongTitle,
            Duration: this.state.selectedSong.Duration,
            Artist: this.state.selectedSong.Artist,
            Genre: this.state.selectedSong.Genre,
            Rating: this.state.selectedSong.Rating,
        }
        console.log(rateSongs);
        Axios.post(
            "http://localhost:2020/uSong",
            rateSongs,
            this.state.config
        ).then((response) => {
            console.log(response.data);
            location.href = "/Homepage";
        }).catch((err) => {
            console.log(err)
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
        });
    };

    handleOpen = (songId) => {
        this.setState({
            show: true,
            selectedSong: this.state.songs.find((song) => {
                return song._id === songId
            })
        });
    };

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
                    <center><Container className="data2">
                            {
                                this.state.songs.map((song) => {
                                    return (
                                        <div className="card" key={song._id}>
                                            <div className="card-body">
                                                <u><h2 className="card-title">{song.SongTitle}</h2></u>
                                                <h4 className="card-subtitle">Duration : {song.Duration}</h4>
                                                <h4 className="card-subtitle">Artist : {song.Artist}</h4>
                                                <h4 className="card-subtitle">Genre : {song.Genre}</h4>
                                                <Button className="btn1" onClick={() => this.handleOpen(song._id)}>Rate</Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                    </Container>
                    </center>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Songs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicSongTitle">
                                <Form.Control placeholder="Song Title" type="text" value={this.state.selectedSong.SongTitle} onChange={this.songTitleUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicDuration">
                                <Form.Control placeholder="Duration" type="text" value={this.state.selectedSong.Duration} onChange={this.songDurationUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicArtist">
                                <Form.Control placeholder="Artist" type="text" value={this.state.selectedSong.Artist} onChange={this.songArtistUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicGenre">
                                <Form.Control placeholder="Genre" value={this.state.selectedSong.Genre} onChange={this.songGenreUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicRating">
                                <Form.Control placeholder="Rating" type = "number" max= "5" min = "0" value={this.state.selectedSong.Rating} onChange={this.songRatingUpdHandler} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.rateHandler}>Rate</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    };
}

export default Homepage;