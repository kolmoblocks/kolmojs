import React, {Component} from 'react';
import DataExpr from './DataExpr';
import RefPanel from './RefPanel';

import PropTypes from 'prop-types';
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
    render() {
        let { kolmo, expr, onChangeCurExpr } = this.props;
        return (
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {Object.keys(expr).map((key, index) => (
                        key == "cids" || key == "data_expressions" ? "" : 
                            <li className="list-group-item">
                                <div style={floatLeft}>{JSON.stringify(key)}</div>
                                <div style={floatCenter}>=</div>
                                <div style={floatRight}>{expr[key]}</div>
                            </li>
                        )
                    )}
                </ul>
                {
                    expr['data_expressions'] ? 
                        expr.data_expressions.map(function(dataExpr) {
                            switch(dataExpr.type) {
                                case "ref":
                                    return <RefPanel kolmo={kolmo} expr={expr} />;           
                                default:
                                    return <DataExpr kolmo={kolmo} dataExpr={dataExpr} dataobject={expr} />;
                            };
                        })
                        : <div />
                }
            </div>
        );
    }    
}