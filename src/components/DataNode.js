import React, {Component} from 'react';
import styled from 'styled-components';
import {MdCloudDownload, MdCloudDone} from 'react-icons/md'; // possible failure in either
import {IoMdRemove, IoMdAdd} from 'react-icons/io'
import PropTypes from 'prop-types';
import { ExpressionInCache,GetDataExpressionByCID } from '../store.js';

    
const StyledDataNode = styled.div`
    ${props => props.dataNodeStyle}
`;

const StyledDataProp = styled.pre`
    ${props => props.dataPropStyle}
`;

const DataExprWrapper = styled.pre`
    ${props => props.dataExprWrapperStyle}
`;

const NodeIcon = styled.div`
    ${props => props.nodeIconStyle}
`;

const NodeLabel = styled.pre`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const FitToParent = styled.div`
    display: block;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

class DataNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: false,
            inCache: false, // ADD SOMETHING TO DETERMINE IN CACHE OR NOT
            loaded: false,
            alreadyLoaded: false,
            expr: {
                data_expressions:[]
            },
            refs: []
        }
        this.loadContent = this.loadContent.bind(this);
    }

    async componentDidMount() {
        let exp = "{ \"cid\" : \"" + this.props.cid + "\" }";
        let isInCache = await ExpressionInCache(exp);
        this.setState({inCache: isInCache});
    }

    async loadContent(cid) {
        // more actions here
        // populate expr, populate refs
        if (this.state.alreadyLoaded && this.state.loaded) {
            this.setState({loaded: false});
        }
        else {
            if (!this.state.alreadyLoaded) {
                try {
                    let myExpr = await GetDataExpressionByCID(cid);
                    let myRefs = [];

                    myExpr['data_expressions'].forEach(function(val, key){
                        myRefs[key] = React.createRef();
                    })

                    this.setState({refs: myRefs});
                    this.setState({expr: myExpr});
                    this.setState({loaded: true});
                }
                catch (error) {
                    console.log(error);
                }
                this.setState({alreadyLoaded: true});
            }
            this.setState({loaded: true});
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
                        <FitToParent>
                            {JSON.stringify(cid, null, 2)}
                        </FitToParent>
                    </NodeLabel>
                    { this.state.loaded ? "Properties: " : ""}
                    { this.state.loaded ? 
                    <StyledDataProp dataPropStyle={dataPropStyle}>
                        {JSON.stringify(noDataExpr, null, 2)};
                    </StyledDataProp> : ""}
                    { this.state.loaded ? "Dependencies: " : ""}
                    { this.state.loaded ? 
                    this.state.refs.map((ref) => (
                        <DataExprWrapper dataExprWrapperStyle={dataExprWrapperStyle} ref={ref}>
                            {JSON.stringify(this.state.expr['data_expressions'][this.state.refs.indexOf(ref)], null, 2)}
                        </DataExprWrapper>
                    ))
                    : "" }
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
    dataNodeStyle: "display: flex; flex-direction: column;  border: 1px solid; text-align: left; text-sized: ",
    dataPropStyle: "overflow-y: hidden;  border: 1px solid;",
    nodeIconStyle: "margin-right: 5px;",
    dataExprWrapperStyle: "border: 1px solid;"
}

export default DataNode;