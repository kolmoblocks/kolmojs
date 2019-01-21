import React, {Component} from 'react';
import styled from 'styled-components';
import {MdCloudDownload, MdCloudDone} from 'react-icons/md'; // possible failure in either
import {IoMdRemove, IoMdAdd} from 'react-icons/io'
import PropTypes from 'prop-types';
import KBStorage from '../proto/BrowserScript/KBstorage';
const KBStore = new KBStorage();

    
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

const NodeLabel = styled.div`
    display: flex;
    flex-direction: row;
`;

class DataNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: false,
            inCache: false, // ADD SOMETHING TO DETERMINE IN CACHE OR NOT
            loaded: false,
            expr: {
                data_expressions:[]
            },
            refs: []
        }
        this.loadContent = this.loadContent.bind(this);
    }

    async componentDidMount() {
        let exp = "{ \"cid\" : \"" + this.props.cid + "\" }";
        let isInCache = await KBStore.ExpressionInCache(exp);
        this.setState({inCache: isInCache});
    }

    async loadContent(cid) {
        // more actions here
        // populate expr, populate refs
        try {
            this.setState({loaded: true});
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const { cid, dataNodeStyle, dataPropStyle, nodeIconStyle, dataExprWrapperStyle, renderContent} = this.props;
        
        // data to send to the data properties component (not yet a separate component)
        let noDataExpr = JSON.parse(JSON.stringify(this.state.expr));
        delete noDataExpr['data_expressions'];
        return (
            <React.Fragment>
                <StyledDataNode dataNodeStyle={dataNodeStyle}>
                    <NodeLabel>
                        <NodeIcon nodeIconStyle={nodeIconStyle} onClick={() => renderContent(cid)}>
                            { this.state.inCache ? <MdCloudDone/> : <MdCloudDownload /> }
                        </NodeIcon>
                        <NodeIcon nodeIconStyle={nodeIconStyle} onClick={() => this.loadContent(cid)}>
                            { this.state.loaded ? <IoMdRemove/> : <IoMdAdd/> }
                        </NodeIcon>
                        {cid}
                    </NodeLabel>

                    { this.state.loaded ? 
                    <StyledDataProp dataPropStyle={dataPropStyle}>
                        {JSON.stringify(noDataExpr, null, 2)};
                    </StyledDataProp>
                    :
                    this.state.refs.map((ref) => (
                        <DataExprWrapper dataExprWrapperStyle={dataExprWrapperStyle} ref={ref}>
                            {JSON.stringify(this.state.expr['data_expressions'][this.state.refs.indexOf(ref)])}
                        </DataExprWrapper>
                    ))
                    }
                </StyledDataNode>
            </React.Fragment>
        )
    }
}

DataNode.propTypes = {
    inCache: PropTypes.bool,
    requested: PropTypes.bool,
    cid: PropTypes.string.isRequired,
    dataNodeStyle: PropTypes.string,
    dataPropStyle: PropTypes.string,
    nodeIconStyle: PropTypes.string,
    dataExprWrapperStyle: PropTypes.string
}

DataNode.defaultProps = {
    inCache: false,
    requested: false,
    dataNodeStyle: "display: flex; flex-direction: col;  border: 1px solid;",
    dataPropStyle: "max-height: 100px; overflow-y: hidden;  border: 1px solid;",
    nodeIconStyle: "margin-right: 5px;",
    dataExprWrapperStyle: "max-height: 85px; border: 1px solid;"
}

export default DataNode;