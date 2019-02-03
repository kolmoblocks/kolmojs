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

export default class DataExpr extends Component {
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
        let { dataExpr, kolmo } = this.props;
        const cacheCheck = (doi) => this.props.kolmo.cache.isCached(doi);

        let type = dataExpr["type"];
        let doKeys = Object.keys(dataExpr).filter(function(key) {
            return ((typeof(dataExpr[key]) === "object") && dataExpr[key].cid);
        });


        // when and expression is executed, call the api and set the new state
        let response = {};
        if (this.allDepsInCache()) {
            await this.props.onExecuteExpr(dataExpr);
            response['content'] = 'Successfully executed expression!'
            response['status'] = 'success';
        }
        else {
            response['status'] = 'danger';
            response['content'] = 'Dependencies must all be in cache!'
        }
        console.log("here!", response);
        this.setState({executionRes : response});
    }

    async selectDep(cid) {
        let { kolmo } = this.props;
        if (!kolmo.cache.metaInfo[cid]) {
            let res = await kolmo.search4MetaInfo(cid);
            console.log("here is what we requested: ", cid, res);
            if (res.status !== 'ok') {
                return
            }
        }
        kolmo.selected = cid;
        kolmo.forceUpdate();
    }

    render() {
        let { dataExpr, onChangeCurExpr, kolmo } = this.props;
        const cacheCheck = (doi) => this.props.kolmo.cache.isCached(doi);

        let type = dataExpr["type"];
        let doKeys = Object.keys(dataExpr).filter(function(key) {
            return ((typeof(dataExpr[key]) === "object") && dataExpr[key].cid);
        });

        return (
            <div className="card mt-3">
                <div className="card-header">
                    <span style={floatLeft}>Expression Type: {JSON.stringify(type)}</span>
                    <a className="ml-2" style={floatLeft} href="#" onClick={() => this.onSelectExpr()}>
                        <MdPlayArrow/> Execute the formula
                    </a>

                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        { 
                            doKeys.map((key) => (
                                <li className="list-group-item">
                                    <div style={floatLeft}>{JSON.stringify(key)}</div>
                                    <div style={floatLeftCenter}>=</div>
                                    <a className="ml-2" href="#" style={floatRight}>
                                        { cacheCheck(dataExpr[key].cid) ? <MdCloudDone/> : <MdCloudDownload/>}
                                    </a>
                                    <a href="#" onClick={() => this.selectDep(dataExpr[key].cid) } style={floatRight}>
                                        <FitToParent>
                                            {dataExpr[key]['cid']}
                                        </FitToParent>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {this.state.executionRes? 
                <div className={"card-footer bg-"+this.state.executionRes.status}>
                    <div className={"card-text text-light"}>
                        {this.state.executionRes.content}
                    </div>
                </div>
                : ""}
            </div>
        );
    }
}