import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { GenerateData, GetDataExpressionByCID } from '../store.js';
import {MdCloudDownload, MdCloudDone, MdLayersClear} from 'react-icons/md'; // possible failure in either
import styled from 'styled-components';

const floatLeft = {
    float: 'left'
}
const floatRight = {
    float: 'right'
}

const floatCenter = {
    position: 'absolute',
    left: '50%',
    right: '50%',
}

export default class DataView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let { expr } = this.props;
        return (
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {Object.keys(expr).map((key, index) => (
                        key == "cids" || key == "data_expressions" ? "" : 
                            <li class="list-group-item">
                                <div style={floatLeft}>{JSON.stringify(key)}</div>
                                <div style={floatCenter}>=</div>
                                <div style={floatRight}>{expr[key]}</div>
                            </li>
                    ))}
                    
                </ul>
            </div>
        );
    }    
}