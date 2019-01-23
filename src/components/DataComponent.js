 import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataNode from './DataNode';
import { GetData, ParseExpression } from '../store.js';

const DataTreeWrapper = styled.div`
    ${props => props.dataTreeStyle}
`; 
export default class DataComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rendered: null
        }
        this.renderContent = this.renderContent.bind(this);
        
    }
    
    
    async renderContent(cid) {
        // should render content with provided expression
        // cycles? don't worry bout that yet
        // this is only when expr == this.props.root.expr
        try {
            let data_exp = await ParseExpression( "{ \"cid\" : \"" + cid + "\" }");
            let content = await GetData(data_exp['data_expressions'][1]);
            this.setState({rendered: content})
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const { dataTreeStyle, root } = this.props;
        return (
        <div className="container">
            <div className="row">
                <div className="col-12"> 
                    <h5>label = {root.label}</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <DataTreeWrapper dataTreeStyle={dataTreeStyle}>
                        <DataNode cid={root.cid} renderContent={this.renderContent} />
                    </DataTreeWrapper>
                </div>
                <div className="col-8">
                    <div id="rendered-content" className="jumbotron">
                        { this.state.rendered ? this.state.rendered : <h5>Rendered content will appear here</h5>}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

DataComponent.propTypes = {
    root: PropTypes.object.isRequired,
    dataTreeStyle: PropTypes.string
}

DataComponent.defaultProps = {
    dataTreeStyle: "max-width: 50vw;"
}