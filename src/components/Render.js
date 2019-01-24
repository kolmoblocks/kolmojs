import React, { Component } from 'react';
import styled from 'styled-components';
import File from './File'
import {loadBlock, lookupBlock} from './../store';

const TreeWrapper = styled.div`
  width: 400px;
`;

export default class Render extends Component { 
  state = {
    selected: null,
    rendered: null
  };

  onSelect = (file) => {
    this.setState({ selected: file });
  }

 renderSelected = (recipe) => {
   console.log(recipe);
    loadBlock(recipe).then((data) => {
      let decoded = new TextDecoder("utf-8").decode(data);
      console.log(decoded);
      this.setState({rendered: decoded}, ()=>{console.log("state set")});
    });
  }

  render() {
    const { selected, rendered } = this.state;
    return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div id="rendered-content" className="jumbotron">
            { rendered ? rendered : <h3>Rendered content will appear here</h3>}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5" >
          <TreeWrapper>
          </TreeWrapper>
        </div>
        <div className="col-12 col-md-7">
          {selected && selected.type === 'node' ?
            <File renderSelected={this.renderSelected} selected={selected}/>
            : <h5>Select a file to view options</h5>
          }
        </div>
      </div>
    </div>
    )
  }
}