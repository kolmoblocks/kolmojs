import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { GenerateData, GetDataExpressionByCID } from '../store.js';
import {MdCloudDownload, MdCloudDone, MdLayersClear} from 'react-icons/md'; // possible failure in either
import styled from 'styled-components';

const FitToParent = styled.div`
    display: block;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: right;
`;

const constrainWidth = {
    maxWidth: '100%'
}

export default class DataController extends Component {
    constructor(props) {
        super(props);
        // set default state and expression stack
        this.state = {
            curIndex: 0,
            dataExprStack: []
        }
        
        this.state.dataExprStack.push(props.rootExpr);

        this.onSelectDataExpr = this.onSelectDataExpr.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        this.getRootExpr = this.getRootExpr.bind(this);
        this.flushDataExprs = this.flushDataExprs.bind(this);
    }

    getRootExpr() {
        return this.state.dataExprStack[0];
    }

    getCurExpr() {
        return this.state.dataExprStack[this.state.curIndex];
    }

    flushDataExprs() {
        if (this.state.dataExprStack.length >= this.state.curIndex) {
            throw "Something went wrong. curIndex is out of range.";
        }
        for (let i = this.state.dataExprStack.length; i >= this.state.curIndex; ++i) {
            this.state.dataExprStack.pop();
        }
    }

    async onSelectDataExpr(expr) {
        // add to data stack
        // change cur data expr
    }

    onClickBack() {
        // check if is at root
        // if not
        // pop from data stack, change data component, change cur expr

    }

    render() {
        let curExpr = this.getCurExpr();
        let rootExpr = this.getRootExpr();
        return (
            <div id="dataController" className="card">
                <div className="card-header">
                    <div className="nav nav-pills card-header-pills">
                        <li className="nav-item">
                            <a className={curExpr==rootExpr? "nav-link disabled" : "nav-link"} href="/#" 
                                aria-disabled={curExpr ==  rootExpr ? "true" : "false"} onClick={() => this.onClickBack()}>
                                Back
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <MdCloudDownload/>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <MdLayersClear/>
                            </a>
                        </li>
                        <li className="nav-link" style={constrainWidth}>
                            <FitToParent>
                                {curExpr['cids']['SHA256']}
                            </FitToParent>
                        </li>
                    </div>
                </div>
                <div className="card-body">
                    {JSON.stringify(curExpr)}
                </div>
            </div>
        );
    }
}