 import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataNode from 'DataNode.js';
const KBStorage = require('../proto/BrowserScript/KBstorage.js');

const DataTreeWrapper = styled.div`
    ${props => props.dataTreeStyle}
`; 
export default class DataComponent extends Component {
    state = {
        rendered: null
    }
    
    async renderContent(expr) {
        // this is only when expr == this.props.root.expr
        try {
            this.rendered = await KBStorage.GetData(expr);
        }
        catch (error) {
            this.rendered = error;
        }
    }

    render() {
        const { dataTreeStyle, root } = this.props;
        return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <DataTreeWrapper dataTreeStyle={dataTreeStyle}>
                        <DataNode expr={val.expr} renderContent={this.renderContent} />
                    </DataTreeWrapper>
                </div>
                <div classname="col-8">
                    <div id="rendered-content" className="jumbotron">
                        { this.state.rendered ? this.state.rendered : <h5>Rendered content will appear here</h5>}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

DataTree.propTypes = {
    dataTreeStyle: PropTypes.string
}

DataNode.defaultProps = {
    dataTreeStyle: "max-width: 50vw;"
}

export default DataComponent;