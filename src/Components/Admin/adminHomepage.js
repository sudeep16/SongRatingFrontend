import React, { Component } from "react";
import userHeader from "./adminHeader";
import './admin.css';
import Axios from "axios";
import { Route } from "react-router-dom";
import { Table, Button, Modal, Form } from "react-bootstrap";

class adminHomepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songsList: [],
            SongTitle: "",
            Duration: "",
            Artist: "",
            Genre: "",
            Rating: "",
            config: {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            },
            show: false,
            showAddSong: false,
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
        this.setState({ Rating: e.target.value})
    }

    deleteHandler = (sID) => {
        const displaySong = this.state.songsList.filter((song) => {
            return song._id !== sID
        })
        this.setState({
            songsList: displaySong
        })

        Axios.delete(
            `http://localhost:2020/song/${sID}`, this.state.config)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    editHandler = (editHandle) => { // use class property plugin in babel rc 
        console.log(this.state.songsList);

        Axios.put(
            `http://localhost:2020/song/${editHandle}`, 
            this.state.selectedSong, 
            this.state.config
        )
            .then((response) => {
                console.log(response);
                location.href = "/adminHomepage"
            })
            .catch((err) => {
                console.log(err);
            })

    }

    addHandler = (e) => {
        e.preventDefault();
        var addSongs = {
            SongTitle: this.state.SongTitle,
            Duration: this.state.Duration,
            Artist: this.state.Artist,
            Genre: this.state.Genre,
            Rating: this.state.Rating,
        }
        console.log(addSongs);
        Axios.post(
            "http://localhost:2020/Song",
            addSongs,
            this.state.config
        ).then((response) => {
            console.log(response.data);
            location.href="/adminHomepage";
        }).catch((err) => {
            console.log(err)
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
            showAddSong: false
        });
    };

    handleOpen = (songId) => {
        this.setState({
            show: true,
            selectedSong: this.state.songsList.find((song) => {
                return song._id === songId
            })
        });
    };

    addSongHandler = () => {
        this.setState({
            showAddSong: true
        });
    };

    componentDidMount() {
        Axios.get("http://localhost:2020/song", this.state.config)
            .then((response) => {
                this.setState({
                    songsList: response.data
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
                    <p className = "btnPara" align = "right"><Button className = "btn2" onClick={this.addSongHandler}>
                                    Add Songs
                    </Button></p>
                    <center>
                        {
                            this.state.songsList.map((song) => {
                                return (
                                    <div className="card" key={song._id}>
                                        <div className="card-body">
                                            <u> <h2 className="card-title">{song.SongTitle}</h2></u>
                                            <h4 className="card-title">Duration : {song.Duration}</h4>
                                            <h4 className="card-title">Artist : {song.Artist}</h4>
                                            <h4 className="card-text">Genre: {song.Genre}</h4>
                                            <Button className="btn1" onClick={() => this.handleOpen(song._id)}>Edit</Button>
                                            <Button className="btn1" onClick={() => this.deleteHandler(song._id)}>Delete</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </center>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Songs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEditSongTitle">
                                <Form.Control type="text" value={this.state.selectedSong.SongTitle} onChange={this.songTitleUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEditSongDuration">
                                <Form.Control type="text" value={this.state.selectedSong.Duration} onChange={this.songDurationUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEditSongArtist">
                                <Form.Control type="text" value={this.state.selectedSong.Artist} onChange={this.songArtistUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEditSongGenre">
                                <Form.Control type="text" value={this.state.selectedSong.Genre} onChange={this.songGenreUpdHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEditSongRating">
                                <Form.Control type="text" value={this.state.selectedSong.Rating} onChange={this.songRatingUpdHandler} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                            Close
</Button>
                        <Button variant="primary" onClick={() => this.editHandler(this.state.selectedSong._id)}>
                            Update
</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showAddSong} onHide={this.handleClose} animation={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Songs</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicSongTitle">
                                    <Form.Control placeholder="Song Title" type="text" value={this.state.SongTitle} onChange={this.sTitleHandler} />
                                </Form.Group>
                                <Form.Group controlId="formBasicDuration">
                                    <Form.Control placeholder="Duration" type="text" value={this.state.Duration} onChange={this.sDurationHandler} />
                                </Form.Group>
                                <Form.Group controlId="formBasicArtist">
                                    <Form.Control placeholder="Artist" type="text" value={this.state.Artist} onChange={this.sArtistHandler} />
                                </Form.Group>
                                <Form.Group controlId="formBasicGenre">
                                    <Form.Control placeholder="Genre" value={this.state.Genre} onChange={this.sGenreHandler} />
                                </Form.Group>
                                <Form.Group controlId="formBasicRating">
                                    <Form.Control placeholder="Rating" value={this.state.Rating} onChange={this.sRatingHandler} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={this.handleClose}>
                                Close
</Button>
                            <Button variant="primary" onClick={this.addHandler}>
                                Add
</Button>
                        </Modal.Footer>
                    </Modal>
            </React.Fragment >
        )
    }
}
export default adminHomepage;   