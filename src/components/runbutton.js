import React, { Component } from 'react';


class RunButton extends Component {
    constructor(props) {
        super(props);
        this.actionClick = this.actionClick.bind(this);
    }

    actionClick() {
        var self = this;
        let {kolmo, funcy } = this.props;
        this.props.kolmo[funcy.opcode](funcy.doi).then( function() {
            self.props.megaupdate.forceUpdate();
        });
    }

    render() {
        return (
            <button onClick={() => this.actionClick() }>run</button>
        )
    }
}

export default RunButton;