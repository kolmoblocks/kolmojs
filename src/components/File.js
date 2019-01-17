import React, { Component } from 'react';
import styled from 'styled-components';
import keys from 'lodash/keys';
import {loadBlock, lookupBlock} from '../store';

const File = (props) => {
    const { selected, renderSelected } = props;
    console.log(renderSelected);
    return (
        <div className="container">
            <div className="card">
                <div id="file-options" className="card-body">
                    <pre className="card-text text-left">
                        {JSON.stringify(selected, null, 2)}
                    </pre>
                    {/* Render dependent of existence of recipes*/}
                    {selected['kolmoblocks'] ? 
                        keys(selected['kolmoblocks']).map((recipe, i) => 
                            <button type="button" 
                                    className="btn btn-success m-1"
                                    onClick={() => renderSelected(selected['kolmoblocks'][recipe])}
                                    >Render w/ Recipe {i}</button>) 
                        : <button type="button" className="btn btn-warning">No Recipes</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default File;