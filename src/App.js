import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home.js"
import SecondExample from "./components/example2.js"
import Render from "./components/Render.js"
import Demo from "./components/Demo.js"

class App extends Component {
  render() {
    return (
      <div className="App p-3">
        <header className="App-header">
          <h3>KolmoLD Tour</h3>
        </header>
        <div className="container-fluid">
          <Router>
          <div className="row">

            <div className="col-2">
              <ul class="list-group">
                <Link to="/" class="list-group-item active">Cras justo odio</Link>
                <Link to="/example2" class="list-group-item">Examplio 2</Link>
                <li class="list-group-item">Dapibus ac facilisis in</li>
              </ul>
            </div>

            <div className="col-6">
                  <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/example2" component={SecondExample}/>
                  </div>
            </div>

            <div className="col-4">
                      <Demo/>
            </div>
          </div>
          </Router>
      </div>
      </div>
    );
  }
}

export default App;
