import React from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';
import PropTypes from 'prop-types';

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20;
  if (type === 'file') paddingLeft += 20;
  return paddingLeft;
}

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;
  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;

const TreeNode = (props) => {
  const { node, getChildNodes, level, onToggle, onNodeSelect, key } = props;
  const cNodes = getChildNodes(key);
  console.log(key);
  console.log(node);
  return (
    <React.Fragment>
      
      <StyledTreeNode level={level} type={node.type}>
        <NodeIcon onClick={() => onToggle(node)}>
          { node.type == 'node' && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />) }
        </NodeIcon>
        
        <NodeIcon marginRight={10}>
          { node.type === 'property' && <FaFile /> }
          { node.type === 'node' && node.isOpen === true && <FaFolderOpen /> }
          { node.type === 'node' && !node.isOpen && <FaFolder /> }
        </NodeIcon>

        <span role="button" onClick={() => onNodeSelect(node)}>
          { node['target_id'] } {/* VAL STUFF GOES HERE */}
        </span>
      </StyledTreeNode>

      {/* start here tomorrow! ************************************************************************** */}
      { node.isOpen && Object.keys(cNodes).forEach( function(nkey) {
        <TreeNode {...props} node={cNodes[nkey]} level={level + 1} key={nkey}/>
      })}
    </React.Fragment>
  );
}

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
  key: PropTypes.any.isRequired,
};

TreeNode.defaultProps = {
  level: 0,
};

export default TreeNode;