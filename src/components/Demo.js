import React, { Component } from 'react';
import DataController from './DataController';

class Demo extends Component {
  state = {
    rootExpr: {
    "MIME" 		: "utf8/text",
    "size" 		: 11,

        "cids" : {
            "SHA256" : "7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C"
        },

        "data_expressions" : [
        {
            "exec" : {
                "wasm" : {
                    "cid" : "_wasm_concat_"
                },
                "arg1" : {
                    "cid" : "2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824"
                },
                "arg2" : {
                    "cid" : "B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E"
                }
            }
        },
        {
            "seq" : {
                "block1" : {
                    "cid" : "2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824"
                },
                "block2" : {
                    "cid" : "B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E"
                }
            }
        }
      ]
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <DataController rootExpr={this.state.rootExpr} >
            </DataController>
          </div>
        </div>

      </div>
    );
  }
}

export default Demo;