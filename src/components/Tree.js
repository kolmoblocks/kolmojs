import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';
import { lookupBlock } from '../store';

export default class Tree extends Component {

  state = {
    nodes: {},
  };

  async componentDidMount() {
    try {
      let nodes = {};
      const tmp = await lookupBlock();
      //lookupBlock().then(function(res) {
        // object with keys same as CIDs of the manifests in /out/public
        // fix this response format!!
        tmp[0].forEach(function(val) {
          nodes[val.target_id] = val;
          nodes[val.target_id]['isOpen'] = false;
          nodes[val.target_id]['type'] = 'node';
        });

        this.setState({nodes});
      //});
    } catch (error) {
      console.log("err!");
    }
  }

  // initial object population
  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes);
  }

  // pressed: chevron
  // parse down the node content to each property and node as objects
  getChildNodes = (key) => {
    const { nodes } = this.state;
    let mani = lookupBlock(key);
    let content = {};
    Object.keys(mani).forEach(function(key) {
      if (key == 'kolmoblocks') {
        console.log("HANDLE THIS SHIT!");
      }else{
        content[key] = {
          type: 'property',
          isOpen: false,
          val: mani[key]
        }
      }
    })
    return content;
  }  

  // pressed: chevron
  // negates the isOpen property of selected node
  onToggle = (node) => {
    const { nodes } = this.state;
    nodes[node.target_id].isOpen = !node.isOpen;
    this.setState({ nodes });
  }

  // pressed: file name
  // passes up to tree to view as raw json
  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        { rootNodes.map((node) => (
          <TreeNode 
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
            key={node['target_id']}
          />
        ))}
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};