import React, {Component} from 'react';
import styled from 'styled-components';
import {MdCloudDownload, MdCloudDone} from 'react-icons/md';
import PropTypes from 'prop-types';
    
const StyledDataNode = styled.div`
    ${props => props.dataNodeStyle}
`;

const NodeIcon = styled.div`
    ${props => props.nodeIconStyle}
`;

export default class DataNode extends Component {
    constructor(props) {
        super(props);
        props.exprBody['data_expressions'].forEach(function(val) {
            
        });
    }
    state = {
        inCache: false
    }
    loadContent = (cid) => {
        
    }

    render() {
        const { inCache, requested, cid, exprBody, dataNodeStyle} = this.props;
        let noDataExpr = JSON.parse(JSON.stringify(exprBody));
        delete noDataExpr['data_expressions'];
        return (
            <React.Fragment>
                <StyledDataNode ref={this.nodeRef} dataNodeStyle={dataNodeStyle}>
                    <NodeIcon onClick={() => loadContent(cid)}>
                        { inCache ? <MdCloudDownload /> : <MdCloudDone/> }
                    </NodeIcon>

                    
                </StyledDataNode>
            </React.Fragment>
        )
    }
}

DataNode.propTypes = {
    inCache: PropTypes.bool,
    requested: PropTypes.bool,
    cid: PropTypes.string.isRequired,
    exprBody: PropTypes.object.isRequired,
    dataNodeStyle: PropTypes.string,
    dataPropStyle: PropTypes.string,
    nodeIconStyle: PropTypes.string
}

DataNode.defaultProps = {
    inCache: false,
    requested: false,
    dataNodeStyle: "display: flex; flex-direction: col;",
    dataPropStyle: "max-height: 100px; overflow-y: hidden;",
    nodeIconStyle: "margin-right: 5px;"
}