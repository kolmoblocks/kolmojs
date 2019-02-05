import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RunButton from './components/runbutton';
import RefreshButton from './components/refreshbutton';

import * as serviceWorker from './serviceWorker';
import kolmo from './kolmo';

// HORRIBLE, but works for now..
// Will soon update with caching instead of variables
// this.blocks = {
//     _root: this,
//     _label: 'blocks'
// };

let refcntl = ReactDOM.render( <App kolmo={kolmo} />, document.getElementById('root'));
kolmo.forceUpdate = () => refcntl.forceUpdate();


var interactives = document.querySelectorAll("div.interactive-canvas");

interactives.forEach(function(interactivePanel) {
    var buttonElement =  interactivePanel.querySelector("span.button-placeholder");
    var textEl =  interactivePanel.querySelector("pre").textContent;
    var funcy = JSON.parse(textEl);
    ReactDOM.render(<RunButton kolmo={kolmo} megaupdate={refcntl}  funcy={funcy} />, buttonElement);
});

ReactDOM.render(<RefreshButton kolmo={kolmo} />, document.getElementById("refresher-b"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
