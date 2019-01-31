import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RunButton from './components/runbutton';
import * as serviceWorker from './serviceWorker';
import kolmo from './kolmo';

// HORRIBLE, but works for now..
// Will soon update with caching instead of variables
// this.blocks = {
//     _root: this,
//     _label: 'blocks'
// };


let kolmoController = <App kolmo={kolmo} />;
let refcntl = ReactDOM.render(kolmoController, document.getElementById('root'));


ReactDOM.render(<RunButton kolmo={kolmo} megaupdate={refcntl}  args="hello banana" />, document.getElementById('kolmorun-button'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
