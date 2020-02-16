import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/User/loginComponent";
import Register from "./Components/User/registerComponent";
import adminLogin from "./Components/Admin/loginComponent"
import Homepage from "./Components/User/Homepage";
import Profile from "./Components/User/Profile";
import RatedMusic from "./Components/User/RatedMusic";
import adminHomepage from "./Components/Admin/adminHomepage";
import userList from "./Components/Admin/userList";

function App() {
  return (
  <>
  <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/adminLogin" component={adminLogin} />
            <Route path="/Homepage" component={Homepage} />
            <Route path="/Profile" component={Profile} />
            <Route path="/Ratedmusic" component={RatedMusic} />
            <Route exact path="/adminHomepage" component={adminHomepage} />
            <Route exact path="/userList" component={userList}/>

          </Switch>
    </Router>
    </>
  );
}

export default App;