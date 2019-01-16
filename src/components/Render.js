import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
import File from './File'
import {loadBlock, lookupBlock} from './../store';

const TreeWrapper = styled.div`
  width: 400px;
`;

export default class Render extends Component { 
  state = {
    selected: null,
  };

  onSelect = (file) => {
    console.log("HERE!");
    this.setState({ selected: file });
  }

  onRenderSelected = (data) => {
    this.setState({rendered: data});
  }
  
  renderContent = (content) => {
    return content;
  };

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
            < Tree onSelect={this.onSelect} />
          </TreeWrapper>
        </div>
        <div className="col-12 col-md-7">
          {selected && selected.type === 'node' ?
            <File onRenderselected={this.onRenderSelected} selected={selected}/>
            : <h5>Select a file to view options</h5>
          }
        </div>
      </div>
    </div>
    )
  }
}