import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

const data = {
  '/all': {
    path: '/all',
    type: 'folder',
    isRoot: true,
    children: ['/all/security', '/all/defense'],
  },
  '/all/security': {
    path: '/all/security',
    type: 'folder',
    children: ['/all/security/readme.md'],
  },
  '/all/security/readme.md': {
    path: '/all/security/readme.md',
    type: 'file',
    content: 'Thanks for reading me me. But there is nothing here.'
  },
  '/all/defense': {
    path: '/all/defense',
    type: 'folder',
    children: ['/all/defense/strategy.txt','/all/defense/readme.md'],
  },
  '/all/defense/readme.md': {
    path: '/all/defense/readme.md',
    type: 'file',
    content: 'There is nothing here either'
  },
  '/all/defense/strategy.txt': {
    path: '/all/defense/strategy.txt',
    type: 'file',
    content: 'Ipsum Lorem blahblah.'
  }
};

export default class Tree extends Component {

  state = {
    nodes: data,
  };

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  }

  getChildNodes = (node) => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  }  

  onToggle = (node) => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  }

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        { rootNodes.map((node, key) => (
          <TreeNode 
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
            key={key}
          />
        ))}
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};