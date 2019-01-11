import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';

const TreeWrapper = styled.div`
  width: 250px;
`;

export default class Render extends Component { 
  state = {
    selectedFile: null,
  };

  onSelect = (file) => this.setState({ selectedFile: file });

  render() {
    const { selectedFile } = this.state;

    return (
    <div className="container">
       <div id="rendered-content" className="jumbotron">
          { selectedFile && selectedFile.type === 'file' && selectedFile.content ? selectedFile.content : <h3>Rendered content will appear here</h3>}
       </div>
       <TreeWrapper>
          < Tree onSelect={this.onSelect} />
        </TreeWrapper>
     </div>
    )
  }
}