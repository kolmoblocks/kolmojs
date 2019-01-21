import React, {Component} from 'react';
import styled from 'styled-components';
import {MdCloudDownload, MdCloudDone} from 'react-icons/md'; // possible failure in either
import {IoMinus, IoPlus} from 'react-icons/lib/io'
import PropTypes from 'prop-types';
    
const StyledDataNode = styled.div`
    ${props => props.dataNodeStyle}
`;

const StyledDataProp = styled.div`
    ${props => props.dataPropStyle}
`;

const DataExprWrapper = styled.div`
    ${props => props.dataExprWrapperStyle}
`;

const NodeIcon = styled.div`
    ${props => props.nodeIconStyle}
`;

export default class DataNode extends Component {
    constructor(props) {
        super(props);
        this.state.requested = this.props.requested;
        props.expr['data_expressions'].forEach(function(val, index) {
            this.state.refs[index] = React.createRef();
        });
    }
    
    state = {
        requested: false,
        inCache: false, // ADD SOMETHING TO DETERMINE IN CACHE OR NOT
        loaded: false,
        refs: []
    }

    loadContent = (cid) => {
        // 
    }

    render() {
        const { cid, dataNodeStyle, dataPropStyle, nodeIconStyle, expr, dataExprWrapperStyle, renderContent} = this.props;
        
        // data to send to the data properties component (not yet a separate component)
        let noDataExpr = JSON.parse(JSON.stringify(expr));
        delete noDataExpr['data_expressions'];
        return (
            <React.Fragment>
                <StyledDataNode dataNodeStyle={dataNodeStyle}>
                    <NodeIcon nodeIconStyle={nodeIconStyle} onClick={() => renderContent(cid)}>
                        { inCache ? <MdCloudDownload /> : <MdCloudDone/> }
                    </NodeIcon>
                    <NodeIcon nodeIconStyle={nodeIconStyle} onClick={() => loadContent(cid)}>
                        { loaded ? <IoMinus/> : <IoPlus/> }
                    </NodeIcon>

                    <StyledDataProp dataPropStyle={dataPropStyle}>
                        {JSON.stringify(noDataExpr, null, 2)};
                    </StyledDataProp>

                    {this.state.refs.map((ref) => (
                        <DataExprWrapper dataExprWrapperStyle={dataExprWrapperStyle}>
                            {JSON.stringify(expr['data_expressions'][this.state.refs.indexOf(ref)])}
                        </DataExprWrapper>
                    ))}
                </StyledDataNode>
            </React.Fragment>
        )
    }
}

DataNode.propTypes = {
    inCache: PropTypes.bool,
    requested: PropTypes.bool,
    expr: PropTypes.object.isRequired,
    dataNodeStyle: PropTypes.string,
    dataPropStyle: PropTypes.string,
    nodeIconStyle: PropTypes.string,
    dataExprWrapperStyle: PropTypes.string
}

DataNode.defaultProps = {
    inCache: false,
    requested: false,
    dataNodeStyle: "display: flex; flex-direction: col;  border: 2px solid;",
    dataPropStyle: "max-height: 100px; overflow-y: hidden;  border: 2px solid;",
    nodeIconStyle: "margin-right: 5px;",
    dataExprWrapperStyle: "max-height: 85px; border: 2px solid;"
}

export default DataNode;