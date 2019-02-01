import React, {Component} from 'react';
import { ExpressionInCache, GetAndCacheExpr } from '../store.js';
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

export default class RefPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            executionRes : null,
            oldExpr: props.dataExpr,
        }
        this.onSelectExpr = this.onSelectExpr.bind(this);
        this.allDepsInCache = this.allDepsInCache.bind(this);
    }

    componentDidUpdate() {
        if (this.props.dataExpr != this.state.oldExpr) {
            this.setState({
                executionRes : null,
                oldExpr : this.props.dataExpr});
        }
    }

    allDepsInCache() {
        let type = Object.keys(this.props.dataExpr)[0];
        let stat = true;
        Object.keys(this.props.dataExpr[type]).forEach(
            (key, index) => {
                let obj = JSON.parse(JSON.stringify(this.props.dataExpr[type][key]));
                if (!ExpressionInCache(obj)) {
                    stat = false;
                }
            }
        )
        return stat;
    }

    async cacheExpression(expr) {
        await GetAndCacheExpr(expr);
        this.forceUpdate();
    }

    async onSelectExpr() {
        // when and expression is executed, call the api and set the new state
        let {kolmo, expr} = this.props;
        let doi = expr.cids.SHA256;
        
        let res = await kolmo.search4Raw(doi);
        if (res.status !== "ok") {
            return this.setState({
                executionRes: {
                    content: res.err,
                    status: 'danger',
                }
            });
        }

        this.setState({
            executionRes: {
                content: "Successfully retrieved the data object from the reference",
                status: 'success',
            }
        });
        kolmo.forceUpdate();
    }

    render() {
        return (<div className="card mt-3">
                <div className="card-header">
                    <span style={floatLeft}>Remote network reference</span>
                    <span className="ml-2" style={floatLeft} onClick={() => this.onSelectExpr()}>
                        <MdPlayArrow/> Fetch from network 
                    </span>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                    </ul>
                </div>
                {this.state.executionRes? 
                <div className={"card-footer bg-"+this.state.executionRes.status}>
                    <div className={"card-text text-light"}>
                        {this.state.executionRes.content}
                    </div>
                </div>
                : ""}
            </div>);
    }
};