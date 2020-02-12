import React, {Component} from "react";
import userHeader from "./userHeader";
import {Route} from "react-router-dom";

class Homepage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <Route component = {userHeader} />
            </React.Fragment>
        )
    }
}

export default Homepage;