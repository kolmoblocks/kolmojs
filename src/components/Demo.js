import React, { Component } from 'react';
import DataComponent from './DataComponent';

class Demo extends Component {
    state = {
      demos: [
          {
              label: 'Hello Banana',
              cid: '7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C',
          }
      ]
  }
  render() {
    return (
      <div className="container-fluid">
        <DataComponent root={this.state.demos[0]}/>
      </div>
    );
  }
}

export default Demo;