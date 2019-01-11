import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home.js"
import Render from "./components/Render.js"
import Demo from "./components/Demo.js"

class App extends Component {
  render() {
    return (
      <div className="App p-3">
        <header className="App-header">
          <h1>KolmoBlocks</h1>
        </header>
        <Router>
          <div>
            <div class="align-items-center p-2">
              <Link to="/" className="btn">Home</Link>
              <Link to="/demo" className="btn">Demo</Link>
              <Link to="/render" className="btn">Render</Link>
            </div>
            
            <Route exact path="/" component={Home}/>
            <Route path="/demo" component={Demo}/>
            <Route path="/render" component={Render}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
