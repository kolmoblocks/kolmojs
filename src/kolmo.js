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
}


let rr = new Remote("");

