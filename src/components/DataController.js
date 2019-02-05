import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { GetDataExpressionByCID, ExpressionInCache, Execute } from '../store.js';
import {MdCloudDownload, MdCloudDone, MdLayersClear, MdCheck} from 'react-icons/md'; // possible failure in either
import styled from 'styled-components';
import DataView from './DataView';
import RefPanel from './RefPanel';

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
        this.flushCache = this.flushCache.bind(this);
        this.onExecuteExpr = this.onExecuteExpr.bind(this);
    }

    getRootExpr() {
        return this.state.dataExprStack[0];
    }

    getCurExpr() {
        return this.state.dataExprStack[this.state.curIndex];
    }

    async flushCache() {
        let doi = this.props.kolmo.selected;
        this.props.kolmo.cache.clearCache(doi);
        this.props.kolmo.forceUpdate();
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
        if (!this.props.kolmo.selected) {
            return (<div id="dataController" className="card">
                <div className="card-header">
                    Select a data object to start
                </div>
            </div>)
        }

        let curExpr = this.props.kolmo.cache.metaInfo[this.props.kolmo.selected];
        let doi = curExpr.cids.SHA256;
        const cacheCheck = this.props.kolmo.cache.isCached(doi);
        let content = "";
        if (cacheCheck) {
            content = new TextDecoder().decode(this.props.kolmo.cache.raw[doi].slice(0,100));
        }

        let rootExpr = this.getRootExpr();
        return (
            <div id="dataController" className="card">
                <div className="card-header">
                    <div className="nav nav-pills card-header-pills">
                        <li className="nav-item">
                            <a className={ true ? "nav-link disabled" : "nav-link"} href="#" 
                                aria-disabled={ true ? "true" : "false"} onClick={() => this.onClickBack()}>
                                Back
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                {  cacheCheck ? (
                                    <span className="badge badge-success">
                                        <MdCloudDone /> Data object retrieved
                                    </span>
                                 ) : (
                                    <span className="badge badge-danger">
                                       <MdCloudDownload/> Data object not retrieved
                                    </span>
                                 )}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => this.flushCache()}>
                                { cacheCheck ? <MdCheck/> : <MdLayersClear/>}
                            </a>
                        </li>
                        <li className="nav-link" style={constrainWidth}>
                            <FitToParent>
                                { doi }
                            </FitToParent>
                        </li>
                    </div>
                </div>
                { cacheCheck ? 
                        <div class="card mt-3 ml-3 mr-3">
                            <div class="card-body">
                                <div class="card-text">
                                    { content }
                                </div>
                            </div>
                        </div>
                : "" }
                <DataView kolmo={this.props.kolmo} onExecuteExpr={this.onExecuteExpr} onChangeCurExpr={this.onChangeCurExpr} expr={curExpr} />
            </div>
        );
    }
}