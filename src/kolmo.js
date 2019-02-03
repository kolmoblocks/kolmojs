/*
    // **search_network_for_raw(doi_expr) -> [data_obj], outcome** - given the doi_expr, search the network if the data is available in raw 
    // **search_network_for_meta_info(doi_expr) -> [meta_info], outcome** - given the doi_expr, search the network for meta information about the data object of interest. Meta information includes things like all the other doi_exprs, attributes and formulas.
    // **is_retrieved_by_doi(doi_expr) -> bool** -looks up whether the current node has the data object identified by the doi cached locally
    // **eval_formula(formula_expr) -> [output_data], outcome** - evaluate the formula. Will only execute if all the dependancies are in cache. 
    // **retrive_data_object_by_doi(doi_expr) -> [data_obj_pointer | nil]**
    // **flush_retrieved_do_by_doi(doi_expr) -> bool**
    // **is_retrieved_by_formula(formula) -> bool** -looks up whether the current node has the data object identified by the formula
*/

class Remote {
    constructor(bootstrapID) {
        this.raw = bootstrapID + "/raw/";
        this.search = bootstrapID + "/search?cid=";
    }

    async search4Raw(doi) {
        let opAct = {
            opAct: "search4Raw",
            args: [doi],
        };

        try {
            const resp = await fetch(this.raw + doi, {cors: "cors"});
            if (!resp.ok) {
                opAct["status"] =  "request returns negative response";
                opAct["resp"] =  resp;
                return opAct;
            }
            const buffer = await resp.arrayBuffer();
            opAct["status"] = "ok";
            opAct["do"] = buffer;
            return opAct;
        } catch(err) {
            opAct["status"] = "failed to send request";
            opAct["err"] = err;
            return opAct;
        }
    }

    async search4MetaInfo(doi) {
        let opAct = {
            opAct: "search4MetaInfo",
            args: [doi],
        };

        try {
            const resp = await fetch(this.search + doi, {cors: "cors"});
            if (!resp.ok) {
                opAct["status"] =  "request returns negative response";
                opAct["resp"] =  resp;
                return opAct;
            }
            const json = await resp.json();
            opAct["status"] = "ok";
            opAct["metaInfo"] = json;
            return opAct;
        } catch(err) {
            opAct["status"] = "failed to send request";
            opAct["err"] = err;
            return opAct;
        }
    }
}

class Cache {
    constructor() {
        this.metaInfo = {
            "e5a6f707c19480993e600d1d765450660745e0ae5919a40f8a013fa8ebb538cd": {
                    "MIME": "text/plain; charset=utf-8",
                    "cids": {
                        "SHA256": "e5a6f707c19480993e600d1d765450660745e0ae5919a40f8a013fa8ebb538cd"
                    },
                    "size": 9,
                    "data_expressions": [
                        {"type": "ref"},
                        {
                            "type": "exec",
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
                    ]
                },
        };
        this.raw = {};
    }

    isCached(doi) {
        return this.raw[doi] !== undefined;
    }

    clearCache(doi) {
        delete this.raw[doi];
    }
}

class Kolmo {
    constructor({cache, remote}) {
        this.cache = cache;
        this.remote = remote;
    }

    async search4MetaInfo(doi) {
        if (!this.cache.metaInfo[doi]) {
            this.cache.metaInfo[doi] = {"cids": {
                    "SHA256": doi,
                }
            }
        }
        this.selected = this.cache.metaInfo[doi];
        let opAct = await this.remote.search4MetaInfo(doi);
        if (opAct.status != "ok") {
            return opAct;
        }
        this.cache.metaInfo[doi] = opAct.metaInfo;
        return opAct;
    }


    async search4Raw(doi) {
        let opAct = await this.remote.search4Raw(doi);
        if (opAct.status != "ok") {
            return opAct;
        }
        this.cache.raw[doi] = opAct.do;
        return opAct;
    }
}

let kolmo = new Kolmo({
        cache: new Cache(),
        remote: new Remote(""),
        selected: undefined, 
});

export default kolmo;

