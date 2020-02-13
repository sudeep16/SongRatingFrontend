import React from 'react';
import './admin.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class uHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <Navbar bg="light" variant="light" className = "Navbar">
                <Navbar.Brand>Song Rating System</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/Homepage">Homepage</Nav.Link>
                    <Nav.Link href="/Profile">Profile</Nav.Link>
                    <Nav.Link href="/RatedMusic">Rated Music</Nav.Link>
                </Nav>
                <Form inline className = "search">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                <Nav>
                    <Nav.Link href="/Logout">Log Out</Nav.Link>
                </Nav>
            </Navbar>
        </Router>
        )
    }
}



export default uHeader;