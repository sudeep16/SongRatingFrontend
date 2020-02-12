import React, { Component } from "react";
import userHeader from "./userHeader";
import { Route } from "react-router-dom";

class Homepage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Route component={userHeader} />

                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Song Title</h3>
                        <h4 class="card-subtitle mb-2 text-muted">Song Artist</h4>
                        <p class="card-text">Song Genre</p>
                    </div>
                </div>
                );
              }
            }
            
            export default App;
            </React.Fragment>
        )
    }
}

export default Homepage;