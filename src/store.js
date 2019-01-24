import KBstorage from './proto/BrowserScript/KBstorage';

const KBStore = new KBstorage();
const lib = {
    "hellobanana" : {

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
        }]

    },

    "hello" : {

        "MIME" 		: "utf8/text",
		"size" 		: 5,

        "cids" : {
            "SHA256" : "2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824"
        },

        "data_expressions" : [{
            "ref" : "file1.txt"
        }]

    },

    "banana" : {

        "MIME" 		: "utf8/text",
		"size" 		: 6,

        "cids" : {
            "SHA256" : "B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E"
        },

        "data_expressions" : [{
            "ref" : "file2.txt"
        }]

    },

    "wasm_concat" : {

        "MIME" 		: "wasm",
        "size" 		: 10251,
        
        "cids" : {
            "SHA256" : "_wasm_concat_"
        },

        "data_expressions" : [{
            "ref" : "buffers_concat.wasm"
        }]

    }

};

export function ExpressionInCache(expr) {
    return true;
}

export async function GetDataExpressionByCID(cid) {
    //return await KBStore.GetDataExpressionByCID(cid);
    if (cid == "7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C") {
        return lib['hellobanana'];
    }
    else if (cid == "2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824") {
        return lib['hello'];
    }
    else if (cid == "B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E") {
        return lib['banana'];
    }
    else if (cid == "_wasm_concat_") {
        console.log(lib['wasm_concat']);
        return lib['wasm_concat'];
    }
    else {
        console.log("I'm not handling this one :/");
        console.log(cid);
    }
}

export async function GenerateData(expr) {
    if (expr == lib['hellobanana']['data_expressions'][0] ||
        expr == lib['hellobanana']['data_expressions'][1]) {
        return "hellobanana";
    }
    else if (expr == lib['hello']['data_expressions'][0]) {
        return "hello";
    }
    else if (expr == lib['banana']['data_expressions'][0]){
        return "banana";
    }
};

export async function lookupBlock(dum) {
    return null;
}

export async function loadBlock(dum) {
    return null;
}


// export function renderBlock(cid, kb, target) {
//     var manifest = this.blocks[cid]['kolmoblocks'][kb];
//     loadKolmoblock(manifest, $(target));
// };