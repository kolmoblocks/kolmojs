import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataNode from 'DataNode.js';
const KBStorage = require('../proto/BrowserScript/KBstorage.js');

const DataTreeWrapper = styled.div`
    ${props => props.dataTreeStyle}
`; 
export default class DataTree extends Component {
    state = {
        demos: [
            {
                label: 'Hello Banana',
                cid: '7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C'
            }
        ]
    }
    
    render() {
        const { dataTreeStyle } = this.props;
        return (
        <DataTreeWrapper dataTreeStyle={dataTreeStyle}>
            {this.state.demos.map((val) => {
                <DataNode cid={val.cid} />
            })}
        </DataTreeWrapper>
        );
    }
}

DataTree.propTypes = {
    dataTreeStyle: PropTypes.string
}

DataNode.defaultProps = {
    dataTreeStyle: "max-width: 50vw;"
}