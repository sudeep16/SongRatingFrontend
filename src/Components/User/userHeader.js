import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

<div className="App">
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                </li>
            </ul>
        </div>
    </nav>
</div>