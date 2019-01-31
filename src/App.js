import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home.js"
import SecondExample from "./components/example2.js"
import Render from "./components/Render.js"
import Demo from "./components/Demo.js"

class App extends Component {
  render() {
    return <Demo kolmo={this.props.kolmo} />;
  }
}

export default App;
