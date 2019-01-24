import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Execute } from '../store.js';
import {MdCloudDownload, MdCloudDone, MdPlayArrow} from 'react-icons/md'; // possible failure in either
import styled from 'styled-components';

const FitToParent = styled.div`
    display: block;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: right;
`;

const floatLeft = {
    float: 'left'
}
const floatRight = {
    float: 'right',
    maxWidth: '55%'
}

const floatLeftCenter = {
    position: 'absolute',
    left: '30%',
    right: '70%',
}

export default class DataExpr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            executionRes : null,
            oldExpr: props.dataExpr
        }
        this.handleDecoding = this.handleDecoding.bind(this);
        this.onExecuteExpr = this.onExecuteExpr.bind(this);
    }

    handleDecoding(result) {
        // decode the result into readable format
        return result;
    }

    componentDidUpdate() {
        if (this.props.dataExpr != this.state.oldExpr) {
            this.setState({
                executionRes : null,
                oldExpr : this.props.dataExpr});
        }
    }

    async onExecuteExpr(dataExpr) {
        // when and expression is executed, call the api and set the new state
        let result = await Execute(dataExpr);
        result = this.handleDecoding(result);
        this.setState({executionRes : result});
    }

    render() {
        let { dataExpr, onChangeCurExpr } = this.props;
        let type = Object.keys(dataExpr)[0];
        return (
            <div className="card mt-3">
                <div className="card-header">
                    <span style={floatLeft}>Expression Type: {JSON.stringify(type)}</span>
                    <a className="mt-2 mr-2" href="#">
                        <MdCloudDownload/>
                    </a>
                    <a className="ml-2" href="#" onClick={() => this.onExecuteExpr(dataExpr)}>
                        <MdPlayArrow/>
                    </a>

                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {dataExpr['ref'] ? dataExpr['ref'] : 
                            Object.keys(dataExpr[type]).map((key, index) => (
                                <li className="list-group-item">
                                    <div style={floatLeft}>{JSON.stringify(key)}</div>
                                    <div style={floatLeftCenter}>=</div>
                                    <a href="#" onClick={() => onChangeCurExpr(dataExpr[type][key]['cid'])} style={floatRight}>
                                        <FitToParent>
                                            {dataExpr[type][key]['cid']}
                                        </FitToParent>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
                {this.state.executionRes? 
                <div className="card-footer">
                    <div class="card">
                        <div class="card-body">
                            {this.state.executionRes}
                        </div>
                    </div>
                </div>
                : ""}
            </div>
        );
    }
}