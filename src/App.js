import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/user/loginComponent";
import Register from "./Components/User/registerComponent";
import Homepage from "./Components/User/Homepage";
import Profile from "./Components/User/Profile"

function App() {
  return (<Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/Homepage" component={Homepage} />
            <Route path="/Profile" component={Profile} />

          </Switch>
    </Router>
  );
}

export default App;