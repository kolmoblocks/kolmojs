import React, { Component } from 'react';


class RunButton extends Component {
    constructor(props) {
        super(props);
        this.actionClick = this.actionClick.bind(this);
    }

    actionClick() {
        var self = this;
        this.props.kolmo.search4MetaInfo(this.props.args).then( function() {
            self.forceUpdate();
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