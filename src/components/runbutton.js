import React, { Component } from 'react';


class RunButton extends Component {
    constructor(props) {
        super(props);
        this.actionClick = this.actionClick.bind(this);
    }

    async actionClick() {
        let {kolmo, funcy } = this.props;
        let res = await kolmo[funcy.opcode](funcy.doi);
        await kolmo.setSelected(funcy.doi);
        kolmo.forceUpdate();
    }

    render() {
        return (
            <button onClick={() => this.actionClick() }>run</button>
        )
    }
}

export default RunButton;