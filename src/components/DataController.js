import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { GetDataExpressionByCID, ExpressionInCache, Execute } from '../store.js';
import {MdCloudDownload, MdCloudDone, MdLayersClear, MdCheck} from 'react-icons/md'; // possible failure in either
import styled from 'styled-components';
import DataView from './DataView';

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
            dataExprStack: [],
            cached: null
        }
        
        this.state.dataExprStack.push(props.rootExpr);

        this.onChangeCurExpr = this.onChangeCurExpr.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        this.getRootExpr = this.getRootExpr.bind(this);
        this.flushDataExprs = this.flushDataExprs.bind(this);
        this.onExecuteExpr = this.onExecuteExpr.bind(this);
    }

    getRootExpr() {
        return this.state.dataExprStack[0];
    }

    getCurExpr() {
        return this.state.dataExprStack[this.state.curIndex];
    }

    flushDataExprs() {
        // clears stack above current element selected
        if (this.state.dataExprStack.length <= this.state.curIndex) {
            throw "Something went wrong. curIndex is out of range.";
        }
        let newStack = [...this.state.dataExprStack];
        newStack.splice(this.state.curIndex+1)
        this.setState({dataExprStack : newStack});
        
    }

    

    async onChangeCurExpr(cid) {
        // add to data stack
        // change cur data expr index
        let newExpr = await GetDataExpressionByCID(cid);
        this.setState({
            dataExprStack: this.state.dataExprStack.concat([newExpr]),
            curIndex : this.state.curIndex + 1}
        );
        
    }

    onClickBack() {
        // decrement current index
       if (this.state.curIndex > 0) {
           this.setState({curIndex : this.state.curIndex - 1})
       }
    }

    onExecuteExpr(expr) {
        let executed = Execute(expr);
        this.setState({cached : executed});
    }

    render() {
        let curExpr = this.getCurExpr();
        let rootExpr = this.getRootExpr();
        return (
            <div id="dataController" className="card">
                <div className="card-header">
                    <div className="nav nav-pills card-header-pills">
                        <li className="nav-item">
                            <a className={curExpr==rootExpr? "nav-link disabled" : "nav-link"} href="#" 
                                aria-disabled={curExpr ==  rootExpr ? "true" : "false"} onClick={() => this.onClickBack()}>
                                Back
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                {ExpressionInCache(curExpr) ? <MdCloudDone/> : <MdCloudDownload/>}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => this.flushDataExprs()}>
                                { this.state.curIndex == this.state.dataExprStack.length -1 ? <MdCheck/> : <MdLayersClear/>}
                            </a>
                        </li>
                        <li className="nav-link" style={constrainWidth}>
                            <FitToParent>
                                {curExpr['cids']['SHA256']}
                            </FitToParent>
                        </li>
                    </div>
                </div>
                {this.state.cached ? 
                        <div class="card mt-3 ml-3 mr-3">
                            <div class="card-body">
                                <div class="card-text">
                                    {this.state.cached}
                                </div>
                            </div>
                        </div>
                : "" }
                <DataView onExecuteExpr={this.onExecuteExpr} onChangeCurExpr={this.onChangeCurExpr} expr={curExpr} />
            </div>
        );
    }
}