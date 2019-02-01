import React, { Component } from 'react';


class RunButton extends Component {
    constructor(props) {
        super(props);
        this.actionClick = this.actionClick.bind(this);
    }

    actionClick() {
        var self = this;
        let {kolmo, funcy } = this.props;
        kolmo[funcy.opcode](funcy.doi).then( function() {
            kolmo.forceUpdate();
        });
    }

    render() {
        return (
            <button onClick={() => this.actionClick() }>run</button>
        )
    }
}

export default RunButton;