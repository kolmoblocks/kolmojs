import React, { Component } from 'react';


class RefreshButton extends Component {
    constructor(props) {
        super(props);
        this.actionClick = this.actionClick.bind(this);
    }

    async actionClick() {
        let {kolmo} = this.props;
        kolmo.forceUpdate();
    }

    render() {
        return (
            <button onClick={() => this.actionClick() }>refresh</button>
        )
    }
}

export default RefreshButton;