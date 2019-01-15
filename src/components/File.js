import React, { Component } from 'react';
import styled from 'styled-components';
import {loadBlock, lookupBlock} from '../store';

const renderBlock = (selected, callback) => {
    let decoded = loadBlock(selected);
    callback(decoded);
}

const File = (props) => {
    const { selected } = props;

    return (
        <div id="file-options" className="container">
            <div className="card">
                <div className="card-body">
                    <pre className="card-text text-left">
                        {JSON.stringify(selected, null, 2)}
                    </pre>
                    
                    {selected.content['kolmoblocks'] ? 
                        selected['kolmoblocks'].map((object, i) => 
                            <button type="button" 
                                    className="btn btn-success"
                                    onClick={renderBlock(object, this.props.onRenderSelected)}>
                                Render w/ Recipe {i}
                            </button>) 
                        : <button type="button" className="btn btn-warning">No Recipes</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default File;