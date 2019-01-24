import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { GenerateData, GetDataExpressionByCID } from '../store.js';
import {MdCloudDownload, MdCloudDone} from 'react-icons/md'; // possible failure in either
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
    }
    render() {
        let { dataExpr, onChangeCurExpr } = this.props;
        let type = Object.keys(dataExpr)[0];
        return (
            <div className="card mt-3">
                <div className="card-header">
                    <span style={floatLeft}>Expression Type: {JSON.stringify(type)}</span>
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
            </div>
        );
    }
}